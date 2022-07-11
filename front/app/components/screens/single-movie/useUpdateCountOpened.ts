import { useEffect } from 'react'
import { useMutation } from 'react-query'

import { movieService } from '@/services/movie.service'

export const useUpdateCountOpened = (slug: string) => {
	const { mutateAsync } = useMutation('update count opened', () =>
		movieService.updateCountOpened(slug)
	)

	useEffect(() => {
		mutateAsync()
	}, [])
}
