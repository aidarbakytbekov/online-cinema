import axios from 'api/interceptors'
import { getRatingsUrl } from '../configs/api.config'

export const ratingService = {
	
	async setRating(movieId: string, value: number) {
		return axios.post<string>(getRatingsUrl('/set-rating'), {
			movie: movieId,
			value,
		})
	},

	async getByUserMovie(movieId: string) {
		return axios.get<number>(getRatingsUrl(`/${movieId}`))
	},
}
