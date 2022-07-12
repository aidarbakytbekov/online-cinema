import axios from 'axios'
import Cookies from 'js-cookie'

import { getAuthUrl } from '@/configs/api.config'

import { IAuthResponse } from '@/store/user/user.interface'

import { API_URL } from './../../configs/api.config'
import { removeTokensStorage, saveToLocalStorage } from './auth.helper'

export const authService = {
	async register(email: string, password: string) {
		const response = await axios.post<IAuthResponse>(
			`${API_URL}${getAuthUrl('/register')}`,
			{
				email,
				password,
			}
		)

		if (response.data.accessToken) {
			saveToLocalStorage(response.data)
		}

		return response
	},
	async login(email: string, password: string) {
		const response = await axios.post<IAuthResponse>(
			`${API_URL}${getAuthUrl('/login')}`,
			{
				email,
				password,
			}
		)

		if (response.data.accessToken) {
			saveToLocalStorage(response.data)
		}

		return response
	},
	logout() {
		removeTokensStorage()
		localStorage.removeItem('user')
	},
	async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken')
		const response = await axios.post<IAuthResponse>(
			`${API_URL}${getAuthUrl('/login/access-token')}`,
			{
				refreshToken,
			},
			{
				headers: {'Content-Type': 'application/json'},
			}
		)

		if (response.data.accessToken) {
			saveToLocalStorage(response.data)
		}

		return response
	},
}

