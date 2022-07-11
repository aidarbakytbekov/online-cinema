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

	async getAllMovies(search?: string, p?: number, limit?: number) {
		const page = p - 1 || 0;
		const moviesPerPage = limit || 12;
		let options = {};

		if (search) {
			options = {
				$or: [
					{
						title: new RegExp(search, 'i'),
					},
				],
			};
		}

		const count = await this.MovieModel.find(options).count();

		const movies = await this.MovieModel.find(options)
			.select(' -updatedAt -__v')
			.sort({
				createdAt: 'desc',
			})
			.populate('actors genres')
			.skip(page * moviesPerPage)
			.limit(moviesPerPage)
			.exec();
		const pages = Math.ceil(count / moviesPerPage);

		return {
			items: movies,
			page,
			total: count,
			limit: Number(moviesPerPage),
			pages,
		};
	}

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

	async movieByActor(actorId: Types.ObjectId, p?: number, limit?: number) {
		const page = p - 1 || 0;
		const moviesPerPage = limit || 12;
		const count = await this.MovieModel.find({ actors: actorId }).count();
		const movies = await this.MovieModel.find({ actors: actorId })
			.skip(page * moviesPerPage)
			.limit(moviesPerPage)
			.exec();
		const pages = Math.ceil(count / moviesPerPage);

		if (!movies.length) throw new NotFoundException('Movies not found!');
		return {
			items: movies,
			page,
			total: count,
			limit: Number(moviesPerPage),
			pages,
		};
	}

	async movieByGenres(genreIds: Types.ObjectId[], p?: number, limit?: number) {
		const page = p - 1 || 0;
		const moviesPerPage = limit || 12;
		const count = await this.MovieModel.find({
			genres: { $in: genreIds },
		}).count();
		const movies = await this.MovieModel.find({
			genres: { $in: genreIds },
		})
			.skip(page * moviesPerPage)
			.limit(moviesPerPage)
			.exec();
		const pages = Math.ceil(count / moviesPerPage);

		if (!movies) throw new NotFoundException('Movies not found!');
		return {
			items: movies,
			page,
			total: count,
			limit: Number(moviesPerPage),
			pages,
		};
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

	async getTrendingMovies(p?: number, limit?: number) {
		const page = p - 1 || 0;
		const moviesPerPage = limit || 12;
		const movies = await this.MovieModel.find({ countOpened: { $gt: 0 } })
			.sort({ countOpened: -1 })
			.populate('genres')
			.skip(page * moviesPerPage)
			.limit(moviesPerPage)
			.exec();
		const count = await this.MovieModel.find({
			countOpened: { $gt: 0 },
		}).count();
		const pages = Math.ceil(count / moviesPerPage);
		return {
			items: movies,
			total: count,
			page,
			limit: Number(moviesPerPage),
			pages,
		};
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
			description: '',
			videoUrl: '',
			slug: '',
			actors: [],
			genres: [],
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
