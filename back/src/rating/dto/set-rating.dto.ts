import { IsNumber } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id'
import { Types } from 'mongoose';

export class SetRatingDto {
  @IsObjectId({message: 'Movie id is invalid!'})
  movie: Types.ObjectId

  @IsNumber()
  value: number 
}