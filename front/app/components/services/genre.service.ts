
import { axiosClassic } from '../../api/interceptors'

import { IGenre } from '../shared/types/movie.types'
import { getGenresUrl } from '../config/api.config';

export const genreService = {
	async getAllGenres(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl('/popular'), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},
}
