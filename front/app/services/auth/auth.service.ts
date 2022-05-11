import Cookies from 'js-cookie'

import { axiosClassic } from '../../api/interceptors'
import { getAuthUrl } from '../../configs/api.config'
import { IAuthResponse } from '../../store/user/user.interface'

import { removeTokensStorage, saveToLocalStorage } from './auth.helper'

export const authService = {
	async register(email: string, password: string) {
		const res = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/register'),
			{ email, password }
		)

		if (res.data.accessToken) {
			saveToLocalStorage(res.data)
		}

		return res
	},

	async login(email: string, password: string) {
		const res = await axiosClassic.post<IAuthResponse>(getAuthUrl('/login'), {
			email,
			password,
		})

		if (res.data.accessToken) {
			saveToLocalStorage(res.data)
		}

		return res
	},

	logout() {
		removeTokensStorage()
		localStorage.removeItem('user')
	},

	async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken')
		const res = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/login/access-token'),
			{ refreshToken },
			{ headers: { 'Content-type': 'application/json' } }
		)

		if (res.data.accessToken) {
			saveToLocalStorage(res.data)
		}

		return res
	},
}
