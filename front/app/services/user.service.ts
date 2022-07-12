import axios from 'api/interceptors'

import { IProfileInput } from '../components/screens/admin/profile/profile.interfacec'
import { getUsersUrl } from '../configs/api.config'
import { IMovie } from '../shared/types/movie.types'
import { IUser } from '../shared/types/user.types'

export const userService = {
	async getUsers(searchTerm?: string) {
		return axios.get<IUser[]>(getUsersUrl(''), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},
	async getProfile() {
		return axios.get<IUser>(getUsersUrl('/profile'))
	},
	async getFavorites() {
		return axios.get<IMovie[]>(getUsersUrl('/profile/favorites'))
	},

	async toggleFavorite(movieId: string) {
		return axios.put<string>(getUsersUrl('/profile/favorites'), {
			movieId,
		})
	},
	async updateProfile(data: IProfileInput) {
		return axios.put<string>(getUsersUrl('/profile'), data)
	},

	async getUserById(_id: string) {
		return axios.get<IUser>(getUsersUrl(`/${_id}`))
	},
	async updateUser(_id: string, data: IUser) {
		return axios.put<string>(getUsersUrl(`/${_id}`), data)
	},

	async deleteUser(_id: string) {
		return axios.delete<string>(getUsersUrl(`/${_id}`))
	},
}
