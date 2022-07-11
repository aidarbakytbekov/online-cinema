import { IMovie } from '@/shared/types/movie.types'

export interface IMovieList {
	title: string
	path: string
	movies: IMovie[]
}
