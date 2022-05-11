import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { movieService } from '@/services/movie.service'

import { getGenresList } from '@/utils/movie/getGenresList'
import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/configs/url.config'

export const useMovies = () => {
	const [keyword, setKeyword] = useState('')
	const debouncedSearch = useDebounce(keyword, 500)

	const queryData = useQuery(
		['search movies list', debouncedSearch],
		() => movieService.getMovies(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(movie): ITableItem => ({
						_id: movie._id,
						editUrl: getAdminUrl(`movie/edit/${movie._id}`),
						items: [
							movie.title,
							getGenresList(movie.genres),
							String(movie.rating),
						],
					})
				),
			onError: (error) => {
				toastError(error, 'Movie list')
			},
		}
	)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		['search movies list', debouncedSearch],
		(movieId: string) => movieService.deleteMovie(movieId),
		{
			onError: (error) => {
				toastError(error, 'Delete movie')
			},
			onSuccess: () => {
				toastr.success('Delete movie', 'You deleted movie successfully')
				queryData.refetch()
			},
		}
	)

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			keyword,
			deleteAsync,
		}),
		[queryData, deleteAsync, keyword]
	)
}
