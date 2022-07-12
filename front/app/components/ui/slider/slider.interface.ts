import { IMovie } from '@/shared/types/movie.types'

export interface ISlide extends Pick<IMovie, '_id' | 'banner' | 'title'> {
  subTitle: string
  path: string
}
