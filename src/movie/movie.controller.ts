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
import { MovieService } from './movie.service';
import { Types } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { GenreIdsDto } from './dto/genreIds.dto';

@Controller('movies')
export class MovieController {
	constructor(private readonly MovieService: MovieService) {}

  @Get()
	async getAllMovies(@Query('searchTerm') searchTerm?: string) {
		return this.MovieService.getAllMovies(searchTerm);
	}

	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.MovieService.movieBySlug(slug);
	}

	@Get('by-actor/:actorId')
	async getMovieByActorId(
		@Param('actorId', IdValidationPipe) actorId: Types.ObjectId
	) {
		return this.MovieService.movieByActor(actorId);
	}

  @UsePipes(new ValidationPipe())
	@Post('by-genres')
	async getMovieByGenres(@Body('genreIds') genreIds: GenreIdsDto[]) {
		return this.MovieService.movieByGenres(genreIds);
	}

	@Get('trending')
	async getTrendingMovies() {
		return this.MovieService.getTrendingMovies();
	}
  @UsePipes(new ValidationPipe())
	@Put('update-count-opened')
	@HttpCode(200)
	async updateCountOpened(@Body('slug') slug: string) {
		return this.MovieService.updateCountOpened(slug)
	}

	@Get(':id')
	@Auth('admin')
	async getMovie(@Param('id', IdValidationPipe) id: string) {
		return this.MovieService.getMovieById(id);
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	@Auth('admin')
	async createMovie() {
		return this.MovieService.createMovie();
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async updateMovie(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: CreateMovieDto
	) {
		return await this.MovieService.updateMovie(id, dto);
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth('admin')
	async deleteMovie(@Param('id', IdValidationPipe) id: string) {
		return await this.MovieService.deleteMovie(id);
	}
}
