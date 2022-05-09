import {
	Controller,
	Post,
	HttpCode,
	UseInterceptors,
	UploadedFile,
	Query,
} from '@nestjs/common';
import { FileService } from './file.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('files')
export class FileController {
	constructor(private readonly FileService: FileService) {}

	@Post()
	@HttpCode(200)
	@Auth('admin')
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(
		@UploadedFile() file: Express.Multer.File,
		@Query('folder') folder?: string
	) {
		return this.FileService.saveFiles([file], folder);
	}
}
