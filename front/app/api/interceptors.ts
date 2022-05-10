import axios from 'axios'

import { API_URL } from '../configs/api.config'

export const axiosClassic = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-type': 'application/json',
	},
})
