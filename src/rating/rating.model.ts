import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { MovieModel } from '../movie/movie.model';
import { UserModel } from 'src/user/user.model';

export interface RatingModel extends Base {}

export class RatingModel extends TimeStamps {
  @prop()
  value: number

  @prop({ref: () => UserModel})
  user: Ref<UserModel>[]

  @prop({ref: () =>  MovieModel})
  movie: Ref< MovieModel>[]

  @prop({default: [], ref: () => MovieModel})
  favorites?: Ref<MovieModel>[]
}
