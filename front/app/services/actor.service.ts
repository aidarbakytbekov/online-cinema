import axios, { axiosClassic } from 'api/interceptors'

import { getActorsUrl } from '../configs/api.config'
import { IActor } from '../shared/types/movie.types'

export const actorService = {
	async getActors(searchTerm?: string) {
		return axiosClassic.get<IActor[]>(getActorsUrl(''), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},

	async deleteActor(_id: string) {
		return axios.delete<string>(getActorsUrl(`/${_id}`))
	},
}
