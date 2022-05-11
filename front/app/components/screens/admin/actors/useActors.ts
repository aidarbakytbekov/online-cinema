import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { actorService } from '@/services/actor.service'

import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/configs/url.config'

export const useActors = () => {
	const [keyword, setKeyword] = useState('')
	const debouncedSearch = useDebounce(keyword, 500)

	const queryData = useQuery(
		['search actors list', debouncedSearch],
		() => actorService.getActors(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(actor): ITableItem => ({
						_id: actor._id,
						editUrl: getAdminUrl(`actor/edit/${actor._id}`),
						items: [actor.name, String(actor.countMovies)],
					})
				),
			onError: (error) => {
				toastError(error, 'Actor list')
			},
		}
	)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		['search actors list', debouncedSearch],
		(actorId: string) => actorService.deleteActor(actorId),
		{
			onError: (error) => {
				toastError(error, 'Delete actor')
			},
			onSuccess: () => {
				toastr.success('Delete actor', 'You deleted actor successfully')
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
