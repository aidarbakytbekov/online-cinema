import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { RatingModel } from './rating.model';
import { InjectModel } from 'nestjs-typegoose';
import { MovieService } from '../movie/movie.service';
import { Types } from 'mongoose';
import { SetRatingDto } from './dto/set-rating.dto';

@Injectable()
export class RatingService {
	constructor(
		@InjectModel(RatingModel)
		private readonly RatingModel: ModelType<RatingModel>,
		private readonly MovieService: MovieService
	) {}

	async getMovieValueById(movieId: Types.ObjectId, userId: Types.ObjectId) {
		return this.RatingModel.findOne({ movie: movieId, user: userId })
			.select('value')
			.exec()
			.then((data) => (data ? data.value : 0));
	}

	async averageMovieRating(movieId: Types.ObjectId | string) {
		const ratingsMovie: RatingModel[] = await this.RatingModel.aggregate()
			.match({
				movie: new Types.ObjectId(movieId),
			})
			.exec();

		return (
			ratingsMovie.reduce((acc, curr) => acc + curr.value, 0) /
			ratingsMovie.length
		);
	}

	async setRating(userId: Types.ObjectId, dto: SetRatingDto) {
		const { movie, value } = dto;

		const newRating = await this.RatingModel.findOneAndUpdate(
			{ movie, user: userId },
			{
				movie,
				userId,
				value,
			},
			{
				new: true,
				upsert: true,
				setDefaultOnInsert: true,
			}
		).exec();

		const averageRating = await this.averageMovieRating(movie);

		await this.MovieService.updateRatings(movie, averageRating);

		return newRating;
	}
}
