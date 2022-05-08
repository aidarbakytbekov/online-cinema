import { GenreModel } from './genre.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenreService {
	constructor(
		@InjectModel(GenreModel) private readonly GenreModel: ModelType<GenreModel>
	) {}

	async genreBySlug(slug: string) {
		const genre = await this.GenreModel.find({ slug }).exec();

		if(!genre.length) throw new NotFoundException('Genre not found!')
		return genre
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

	async getCollections() {
		const genres = await this.getAllGenres();

		const collections = genres;

		return collections;
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
