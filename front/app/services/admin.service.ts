import axios from 'api/interceptors'

import { getUsersUrl } from '../configs/api.config'

export const adminService = {
	async getCountUsers() {
		return axios.get<number>(getUsersUrl('/count'))
	},
}
