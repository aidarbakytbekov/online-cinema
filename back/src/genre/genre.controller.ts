import {
	Controller,
	Query,
	Get,
	HttpCode,
	Put,
	UsePipes,
	ValidationPipe,
	Param,
	Body,
	Delete,
	Post,
} from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { IdValidationPipe } from '../pipes/id.validation.pipe';
import { CreateGenreDto } from './dto/create-genre.dto';
import { GenreService } from './genre.service';

@Controller('genres')
export class GenreController {
	constructor(private readonly GenreService: GenreService) {}

	@Get()
	async getAllGenres(@Query('searchTerm') searchTerm?: string) {
		return this.GenreService.getAllGenres(searchTerm);
	}

	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.GenreService.genreBySlug(slug);
	}
	
	@Get('popular')
	async getPopular() {
		return this.GenreService.getPopular()
	}

	@Get('collections')
	async getCollections() {
		return this.GenreService.getCollections();
	}
	
	@Get(':id')
	@Auth('admin')
	async getGenre(@Param('id', IdValidationPipe) id: string) {
		return this.GenreService.getGenreById(id);
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	@Auth('admin')
	async createGenre() {
		return this.GenreService.createGenre();
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async updateGenre(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: CreateGenreDto
	) {
		return await this.GenreService.updateGenre(id, dto);
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth('admin')
	async deleteGenre(@Param('id', IdValidationPipe) id: string) {
		return await this.GenreService.deleteGenre(id);
	}
}
