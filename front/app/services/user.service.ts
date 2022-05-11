
import { IUser } from '../shared/types/user.types';
import { getUsersUrl } from '../configs/api.config';
import axios from '../api/interceptors';
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

  async deleteUser(_id: string) {
    return axios.delete<string>(getUsersUrl(`/${_id}`))
  }
}