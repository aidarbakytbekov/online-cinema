import {
	Controller,
	Get,
	UsePipes,
	ValidationPipe,
	Body,
	HttpCode,
	Post,
	Param,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from '../user/decorator/user.decorator';
import { SetRatingDto } from './dto/set-rating.dto';
import { IdValidationPipe } from '../pipes/id.validation.pipe';
import { Types } from 'mongoose';

@Controller('ratings')
export class RatingController {
	constructor(private readonly RatingService: RatingService) {}

	@Get(':movieId')
	@Auth()
	async getMovieValue(
		@Param('movieId', IdValidationPipe) movieId: Types.ObjectId,
		@User('_id') _id: Types.ObjectId
	) {
		return this.RatingService.getMovieValueById(movieId, _id);
	}

	@UsePipes(new ValidationPipe())
	@Post('set-rating')
	@HttpCode(200)
	@Auth()
	async setRatings(@User('_id') userId: Types.ObjectId, @Body() dto: SetRatingDto) {
		return this.RatingService.setRating(userId, dto);
	}
}
