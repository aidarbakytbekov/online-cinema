import { axiosClassic } from '../api/interceptors'
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

	async getPopularMovies() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(
			getMoviesUrl('/trending')
		)

		return movies
	},
}
