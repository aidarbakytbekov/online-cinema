import { MovieModel } from './movie.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Types } from 'mongoose';
import { GenreIdsDto } from './dto/genreIds.dto';

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(MovieModel) private readonly MovieModel: ModelType<MovieModel>
	) {}

	async movieBySlug(slug: string) {
		const movie = await this.MovieModel.findOne({ slug })
			.populate('actors genres')
			.exec();

		if (movie) {
			return movie;
		} else {
			throw new NotFoundException('Movie not found!');
		}
	}

	async movieByActor(actorId: Types.ObjectId) {
		const movies = await this.MovieModel.find({ actors: actorId }).exec();

		if (!movies.length) throw new NotFoundException('Movies not found!');
		return movies;
	}

	async movieByGenres(genreIds: Types.ObjectId[]) {
		const movies = await this.MovieModel.find({
			genres: { $in: genreIds },
		}).exec();

		if (!movies) throw new NotFoundException('Movies not found!');
		return movies;
	}

	async updateCountOpened(slug: string) {
		const updatedMovie = await this.MovieModel.findOneAndUpdate(
			{ slug },
			{
				$inc: { countOpened: 1 },
			},
			{
				new: true,
			}
		).exec();

		if (!updatedMovie) throw new NotFoundException('Movies not found!');
		return updatedMovie;
	}

	async updateRatings(id: Types.ObjectId, newRating: number) {
		return this.MovieModel.findByIdAndUpdate(
			id,
			{
				rating: newRating,
			},
			{
				new: true,
			}
		).exec();
	}

	async getAllMovies(searchTerm?: string) {
		let options = {};

		if (searchTerm) {
			options = {
				$or: [
					{
						title: new RegExp(searchTerm, 'i'),
					},
				],
			};
		}

		return this.MovieModel.find(options)
			.select(' -updatedAt -__v')
			.sort({
				createdAt: 'desc',
			})
			.populate('actors genres')
			.exec();
	}

	async getTrendingMovies() {
		return await this.MovieModel.find({ countOpened: { $gt: 0 } })
			.sort({ countOpened: -1 })
			.populate('genres')
			.exec();
	}

	async getMovieById(id) {
		const movie = await this.MovieModel.findById(id);

		if (movie) {
			return movie;
		} else {
			throw new NotFoundException('Movie not found!');
		}
	}

	async createMovie() {
		const defaultValue: CreateMovieDto = {
			poster: '',
			banner: '',
			title: '',
			slug: '',
			actors: [],
			genres: [],
			videoUrl: '',
		};

		const movie = await this.MovieModel.create(defaultValue);
		return movie._id;
	}

	async updateMovie(id: string, dto: CreateMovieDto) {
		const updatedMovie = await this.MovieModel.findByIdAndUpdate(id, dto, {
			new: true,
		}).exec();

		if (!updatedMovie) throw new NotFoundException('Movie not found!');

		return updatedMovie;
	}

	async deleteMovie(id: string) {
		const deletedMovie = this.MovieModel.findByIdAndDelete(id).exec();

		if (!deletedMovie) throw new NotFoundException('Movie not found!');

		return deletedMovie;
	}
}
