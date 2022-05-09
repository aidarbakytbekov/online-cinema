import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ActorModel } from './actor.model';
import { ActorDto } from './actor.dto';

@Injectable()
export class ActorService {
	constructor(
		@InjectModel(ActorModel) private readonly ActorModel: ModelType<ActorModel>
	) {}

	async actorBySlug(slug: string) {
		const actor = await this.ActorModel.findOne({ slug }).exec();

		if (!actor) throw new NotFoundException('Actor not found!');
		return actor;
	}

	async getAllActors(searchTerm?: string) {
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
				],
			};
		}

		return this.ActorModel.aggregate()
			.match(options)
			.lookup({
				from: 'Movie',
				foreignField: 'actors',
				localField: '_id',
				as: 'movies',
			})
			.addFields({
				countMovies: {
					$size: '$movies',
				},
			})
			.project({
				__v: 0,
				updatedAt: 0,
				movies: 0,
			})
			.sort({
				createdAt: -1,
			})
			.exec();
	}

	async getActorById(id) {
		const actor = await this.ActorModel.findById(id);

		if (actor) {
			return actor;
		} else {
			throw new NotFoundException('Actor not found!');
		}
	}

	async createActor() {
		const defaultValue: ActorDto = {
			name: '',
			slug: '',
			photo: '',
		};

		const actor = await this.ActorModel.create(defaultValue);
		return actor._id;
	}

	async updateActor(id: string, dto: ActorDto) {
		const updatedActor = await this.ActorModel.findByIdAndUpdate(id, dto, {
			new: true,
		}).exec();

		if (!updatedActor) throw new NotFoundException('Actor not found!');

		return updatedActor;
	}

	async deleteActor(id: string) {
		const deletedActor = this.ActorModel.findByIdAndDelete(id).exec();

		if (!deletedActor) throw new NotFoundException('Actor not found!');

		return deletedActor;
	}
}
