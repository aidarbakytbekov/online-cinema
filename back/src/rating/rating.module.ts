import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { RatingModel } from './rating.model';
import { MovieModule } from '../movie/movie.module';

@Module({
  controllers: [RatingController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: RatingModel,
        schemaOptions: {
          collection: 'Rating'
        }
      }
    ]),
    MovieModule
  ],
  providers: [RatingService]
})
export class RatingModule {}
