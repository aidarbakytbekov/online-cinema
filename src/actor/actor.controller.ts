import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { ActorDto } from './actor.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { IdValidationPipe } from '../pipes/id.validation.pipe';
import { ActorService } from './actor.service';

@Controller('actors')
export class ActorController {
	constructor(private readonly ActorService: ActorService) {}

	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.ActorService.actorBySlug(slug);
	}

	@Get()
	async getAllActors(@Query('searchTerm') searchTerm?: string) {
		return this.ActorService.getAllActors(searchTerm);
	}

	@Get(':id')
	@Auth('admin')
	async getActor(@Param('id', IdValidationPipe) id: string) {
		return this.ActorService.getActorById(id);
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	@Auth('admin')
	async createActor() {
		return this.ActorService.createActor();
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async updateActor(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: ActorDto
	) {
		return await this.ActorService.updateActor(id, dto);
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth('admin')
	async deleteActor(@Param('id', IdValidationPipe) id: string) {
		return await this.ActorService.deleteActor(id);
	}
}
