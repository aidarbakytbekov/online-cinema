
import axios, { axiosClassic } from 'api/interceptors'


import { IGenre } from '../shared/types/movie.types'
import { getGenresUrl } from '../configs/api.config';

export const genreService = {
	async getGenres(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl(''), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},

	async deleteGenre(_id: string) {
    return axios.delete<string>(getGenresUrl(`/${_id}`))
  },
}
