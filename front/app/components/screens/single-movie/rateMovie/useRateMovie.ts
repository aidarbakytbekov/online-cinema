import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ratingService } from '@/services/rating.service'
import { useAuth } from '@/hooks/useAuth';

export const useRateMovie = (movieId: string) => {
	const [rating, setRating] = useState(0)
	const [isSended, setIsSended] = useState(false)
	const {user} = useAuth()

	const { refetch } = useQuery(
		['your movie rating', movieId],
		() => ratingService.getByUserMovie(movieId),
		{
			onSuccess: ({ data }) => {
				setRating(data)
			},
			enabled: !!movieId && !!user,
		}
	)

	const { mutateAsync } = useMutation(
		'set movie rating',
		({ value }: { value: number }) => ratingService.setRating(movieId, value),
		{
			onSuccess: () => {
				toastr.success('Update rating', 'Thanks for your rating')
				setIsSended(true)
				refetch()

				setTimeout(() => {
					setIsSended(false)
				}, 2400)
			},
		}
	)

	const handleClick = async (nextValue: number) => {
		setRating(nextValue)
		await mutateAsync({ value: nextValue })
	}

	return { isSended, rating, handleClick }
}
