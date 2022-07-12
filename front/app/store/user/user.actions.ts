import { createAsyncThunk } from '@reduxjs/toolkit'
import { toastr } from 'react-redux-toastr'

import { errorCatch } from '../../api/api.helpers'
import { authService } from '@/services/auth/auth.service'
import { toastError } from '@/utils/toast-error'

import { IAuthResponse, IEmailPassword } from './user.interface'

/* register */
export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'user/register',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const res = await authService.register(email, password)
			toastr.success('Registration', 'Completed successfully')
			return res.data
		} catch (err) {
			toastError(err)
			return rejectWithValue(err)
		}
	}
)
/* login */

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'user/login',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const res = await authService.login(email, password)
			toastr.success('Login', 'Completed successfully')
			return res.data
		} catch (err) {
			toastError(err)
			return rejectWithValue(err)
		}
	}
)
/* logout */

export const logout = createAsyncThunk(
	'user/logout',
	async (_, { rejectWithValue }) => {
		await authService.logout()
	}
)
/* checkAuth */

export const checkAuth = createAsyncThunk<IAuthResponse>(
	'user/check-auth',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			const res = await authService.getNewTokens()
			return res.data
		} catch (err) {
			if (errorCatch(err) === 'jet expired') {
				toastr.error(
					'Logout',
					'Your authorization is finished! Please, sign in again'
				)
				dispatch(logout())
			}
			return rejectWithValue(err)
		}
	}
)
