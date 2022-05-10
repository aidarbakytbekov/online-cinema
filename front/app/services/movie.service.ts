
import { axiosClassic } from '../api/interceptors'

import { IMovie } from '../shared/types/movie.types';
import { getMoviesUrl } from '../configs/api.config';

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
}
