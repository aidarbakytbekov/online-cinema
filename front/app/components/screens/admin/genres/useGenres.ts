import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/configs/url.config'

import { genreService } from '@/services/genre.service'
import { useRouter } from 'next/router';

export const useGenres = () => {
	const [keyword, setKeyword] = useState('')
	const debouncedSearch = useDebounce(keyword, 500)
	const {push} = useRouter()

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

	const { mutateAsync: createAsync } = useMutation(
		['create genre', debouncedSearch],
		() => genreService.create(),
		{
			onError: (error) => {
				toastError(error, 'Create genre')
			},
			onSuccess: ({data: _id}) => {
				toastr.success('Create genre', 'You created genre successfully')
				push(`genre/edit/${_id}`)
			},
		}
	)

	const { mutateAsync: deleteAsync } = useMutation(
		['delete genre', debouncedSearch],
		(genreId: string) => genreService.delete(genreId),
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
			createAsync
		}),
		[queryData, deleteAsync, keyword, createAsync]
	)
}
