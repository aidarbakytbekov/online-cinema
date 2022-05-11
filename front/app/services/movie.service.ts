import axios, { axiosClassic } from 'api/interceptors';
import { getMoviesUrl } from '../configs/api.config'
import { IMovie } from '../shared/types/movie.types'

export const movieService = {
	async getMovies(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},

	async deleteMovie(_id: string) {
    return axios.delete<string>(getMoviesUrl(`/${_id}`))
  },

	async getPopularMovies() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(
			getMoviesUrl('/trending')
		)

		return movies
	},
}
