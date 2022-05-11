import { configureStore } from '@reduxjs/toolkit'

import { reducers } from './rootReducer'


const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
	devTools: process.env.NODE_ENV !== 'production',
})

export type TypeRootState = ReturnType<typeof store.getState>

export default store
