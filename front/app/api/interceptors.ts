import axios from 'axios'
import Cookies from 'js-cookie'

import { API_URL } from '../configs/api.config'
import { removeTokensStorage } from '../services/auth/auth.helper'
import { authService } from '../services/auth/auth.service'

import { errorCatch } from './api.helpers'

export const axiosClassic = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-type': 'application/json',
	},
})
export const instance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-type': 'application/json',
	},
})

instance.interceptors.request.use((config) => {
	const accessToken = Cookies.get('accessToken')

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

instance.interceptors.response.use(
	(config) => config,
	async (error) => {
		const originalRequest = error.config

		if (
			(error.response.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await authService.getNewTokens()
				return instance.request(originalRequest)
			} catch (e) {
				if (errorCatch(e) === 'jwt expired') removeTokensStorage()
			}
		}
		throw error
	}
)

export default instance
