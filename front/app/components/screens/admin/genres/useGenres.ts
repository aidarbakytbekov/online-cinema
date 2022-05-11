import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/configs/url.config'

import { genreService } from '@/services/genre.service'

export const useGenres = () => {
	const [keyword, setKeyword] = useState('')
	const debouncedSearch = useDebounce(keyword, 500)

	const queryData = useQuery(
		['search genres list', debouncedSearch],
		() => genreService.getGenres(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(genre): ITableItem => ({
						_id: genre._id,
						editUrl: getAdminUrl(`genre/edit/${genre._id}`),
						items: [genre.name, genre.slug],
					})
				),
			onError: (error) => {
				toastError(error, 'Genre list')
			},
		}
	)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		['search genres list', debouncedSearch],
		(genreId: string) => genreService.deleteGenre(genreId),
		{
			onError: (error) => {
				toastError(error, 'Delete genre')
			},
			onSuccess: () => {
				toastr.success('Delete genre', 'You deleted genre successfully')
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
