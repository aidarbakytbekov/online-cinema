import Cookies from 'js-cookie'

import { IAuthResponse } from '@/store/user/user.interface'

import { ITokens } from '../../store/user/user.interface'

export const saveTokensStorage = (data: ITokens) => {
	Cookies.set('accessToken', data.accessToken)
	Cookies.set('refreshToken', data.refreshToken)
}

export const saveToLocalStorage = (data: IAuthResponse) => {
	saveTokensStorage(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}

export const removeTokensStorage = () => {
  Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
}