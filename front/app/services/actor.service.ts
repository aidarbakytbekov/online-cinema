import axios, { axiosClassic } from 'api/interceptors'

import { getActorsUrl } from '../configs/api.config'
import { IActor } from '../shared/types/movie.types'
import { IActorEditInput } from '../components/screens/admin/actor/actor-edit.interface';

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

	async getById(_id: string) {
		return axios.get<IActorEditInput>(getActorsUrl(`/${_id}`))
	},
	async getBySlug(slug: string) {
		return axiosClassic.get<IActor>(getActorsUrl(`/by-slug/${slug}`))
	},
	
	async create() {
		return axios.post<string>(getActorsUrl(`/`))
	},
	
	async update(_id: string, data: IActorEditInput) {
		return axios.put<string>(getActorsUrl(`/${_id}`), data)
	},
	async deleteActor(_id: string) {
		return axios.delete<string>(getActorsUrl(`/${_id}`))
	},
}
