import { createSlice } from '@reduxjs/toolkit'

import { getStoreLocalStorage } from '@/utils/localStorage'

import { checkAuth, login, logout, register } from './user.actions'
import { IInitialState } from './user.interface'

const initialState: IInitialState = {
	isLoading: false,
	user: getStoreLocalStorage('user'),
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: {
		[register.pending.toString()]: (state) => {
			state.isLoading = true
		},
		[register.fulfilled.toString()]: (state, { payload }) => {
			state.isLoading = false
			state.user = payload.user
		},
		[register.rejected.toString()]: (state) => {
			state.isLoading = false
			state.user = null
		},
		[login.pending.toString()]: (state) => {
			state.isLoading = true
		},
		[login.fulfilled.toString()]: (state, { payload }) => {
			state.isLoading = false
			state.user = payload.user
		},
		[login.rejected.toString()]: (state) => {
			state.isLoading = false
			state.user = null
		},
		[logout.fulfilled.toString()]: (state) => {
			state.isLoading = false
			state.user = null
		},
		[checkAuth.fulfilled.toString()]: (state, { payload }) => {
			state.user = payload.user
		},
	},
})

export default userSlice.reducer
