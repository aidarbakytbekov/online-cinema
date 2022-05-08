import { Collection } from './genre.interface';
import { GenreModel } from './genre.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateGenreDto } from './dto/create-genre.dto';
import { MovieService } from '../movie/movie.service';

@Injectable()
export class GenreService {
	constructor(
		@InjectModel(GenreModel) private readonly GenreModel: ModelType<GenreModel>,
		private readonly MovieService: MovieService
	) {}

	async genreBySlug(slug: string) {
		const genre = await this.GenreModel.findOne({ slug }).exec();

		if (!genre) throw new NotFoundException('Genre not found!');
		return genre;
	}

	async getAllGenres(searchTerm?: string) {
		let options = {};

		if (searchTerm) {
			options = {
				$or: [
					{
						name: new RegExp(searchTerm, 'i'),
					},
					{
						slug: new RegExp(searchTerm, 'i'),
					},
					{
						description: new RegExp(searchTerm, 'i'),
					},
				],
			};
		}

		return this.GenreModel.find(options)
			.select(' -updatedAt -__v')
			.sort({
				createdAt: 'desc',
			})
			.exec();
	}

	async getCollections(): Promise<Collection[]> {
		const genres = await this.getAllGenres();

		const collections = await Promise.all(
			genres.map(async (item) => {
				const moviesByGenre = await this.MovieService.movieByGenres([item._id]);

				const result: Collection = {
					_id: String(item._id),
					title: item.name,
					slug: item.slug,
					image: moviesByGenre[0]?.banner
				};
				
				return result;
			})
		);

		return collections;
	}

	async getPopular(): Promise<DocumentType<GenreModel>[]> {
		return this.GenreModel
			.find()
			.select('-updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.exec()
	}

	async getGenreById(id) {
		const genre = await this.GenreModel.findById(id);

		if (genre) {
			return genre;
		} else {
			throw new NotFoundException('Genre not found!');
		}
	}

	async createGenre() {
		const defaultValue: CreateGenreDto = {
			name: '',
			slug: '',
			icon: '',
			description: '',
		};

		const genre = await this.GenreModel.create(defaultValue);
		return genre._id;
	}

	async updateGenre(id: string, dto: CreateGenreDto) {
		const updatedGenre = await this.GenreModel.findByIdAndUpdate(id, dto, {
			new: true,
		}).exec();

		if (!updatedGenre) throw new NotFoundException('Genre not found!');

		return updatedGenre;
	}

	async deleteGenre(id: string) {
		const deletedGenre = this.GenreModel.findByIdAndDelete(id).exec();

		if (!deletedGenre) throw new NotFoundException('Genre not found!');

		return deletedGenre;
	}
}
