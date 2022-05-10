import { TypeMaterialIconName } from './icon.types'

export interface IGenre {
	_id: string
	name: string
	slug: string
	description: string
	icon: TypeMaterialIconName
}

export interface IParameters {
  year: number;
  runtime: number
  country: string
}

export interface IActor {
  _id: string
  name: string
  slug: string
  countMovies: number
  photo: string
}

export interface IMovie {
	_id: string
	poster: string
	banner: string
	title: string
	slug: string
	parameters: IParameters
	rating: number
	videoUrl: string
	countOpened: number
	genres: IGenre[]
	actors: IActor[]
}
