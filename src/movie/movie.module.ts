import { MovieModel } from './movie.model';
import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule } from '@nestjs/config';


@Module({
  controllers: [MovieController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: MovieModel,
        schemaOptions: {
          collection: 'Movie'
        }
      }
    ]),
  ],
  providers: [MovieService]
})
export class MovieModule {}
