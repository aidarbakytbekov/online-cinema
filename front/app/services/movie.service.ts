import axios, { axiosClassic } from 'api/interceptors'

import { IMovieResponse } from '../../pages/fresh'
import { IMovieEditInput } from '../components/screens/admin/movie/movie-edit.interface'
import { getMoviesUrl } from '../configs/api.config'
import { IMovie } from '../shared/types/movie.types'

export const movieService = {
	async getMovies(params?: object) {
		return axiosClassic.get<IMovieResponse>(getMoviesUrl(''), { params })
	},

	async getById(_id: string) {
		return axios.get<IMovieEditInput>(getMoviesUrl(`/${_id}`))
	},

	async getBySlug(slug: string) {
		return axiosClassic.get<IMovie>(getMoviesUrl(`/by-slug/${slug}`))
	},

	async getByGenres(genreIds: string[], params?: object) {
		return axiosClassic.post<IMovieResponse>(
			getMoviesUrl(`/by-genres`),
			{
				genreIds,
			},
			{ params }
		)
	},
	async getByActor(actorId: string) {
		return axiosClassic.get<IMovieResponse>(
			getMoviesUrl(`/by-actor/${actorId}`)
		)
	},

	async create() {
		return axios.post<string>(getMoviesUrl(`/`))
	},

	async update(_id: string, data: IMovieEditInput) {
		return axios.put<string>(getMoviesUrl(`/${_id}`), data)
	},
	async updateCountOpened(slug: string) {
		return axiosClassic.put<string>(getMoviesUrl('/update-count-opened'), {
			slug,
		})
	},

	async deleteMovie(_id: string) {
		return axios.delete<string>(getMoviesUrl(`/${_id}`))
	},

	async getPopularMovies(params?: object) {
		return await axiosClassic.get<IMovieResponse>(getMoviesUrl('/trending'), {
			params,
		})
	},
}
