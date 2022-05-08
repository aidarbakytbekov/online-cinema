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
		const actor = await this.ActorModel.find({ slug }).exec();

    if(!actor.length) throw new NotFoundException('Actor not found!')
    return actor
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

		return this.ActorModel.find(options)
			.select(' -updatedAt -__v')
			.sort({
				createdAt: 'desc',
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
