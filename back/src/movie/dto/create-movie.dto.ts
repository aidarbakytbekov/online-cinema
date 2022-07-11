import {
	IsArray,
	IsNumber,
	IsObject,
	IsString,
} from 'class-validator';

export class Parameters {
	@IsNumber()
	releaseYear: number;

	@IsNumber()
	runtime: number;

	@IsString()
	country: string;
}

export class CreateMovieDto {
	@IsString()
	poster: string;

	@IsString()
	banner: string;

	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsString()
	slug: string;

	@IsObject()
	parameters?: Parameters;

	@IsString()
	videoUrl: string;

	@IsArray()
	@IsString({ each: true })
	genres: string[];

	@IsArray()
	@IsString({ each: true })
	actors: string[];

	isSendTelegram?: boolean;
}
