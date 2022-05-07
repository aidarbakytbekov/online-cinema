import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';

import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from 'src/user/user.model';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>
	) {}

	async getById(id) {
		const user = await this.userModel.findById(id);

		if (user) {
			return user;
		} else {
			throw new NotFoundException('User not found!');
		}
	}
}
