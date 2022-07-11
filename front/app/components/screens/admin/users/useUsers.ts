import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { userService } from '@/services/user.service'

import { convertMongoDbData } from '@/utils/data/convertMongoDbData'
import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/configs/url.config'

export const useUsers = () => {
	const [keyword, setKeyword] = useState('')
	const debouncedSearch = useDebounce(keyword, 500)

	const queryData = useQuery(
		['search users list', debouncedSearch],
		() => userService.getUsers(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(user): ITableItem => ({
						_id: user._id,
						editUrl: getAdminUrl(`user/edit/${user._id}`),
						items: [user.email, convertMongoDbData(user.createdAt)],
					})
				),
			onError: (error) => {
				toastError(error, 'User list')
			},
		}
	)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		['delete user', debouncedSearch],
		(userId: string) => userService.deleteUser(userId),
		{
			onError: (error) => {
				toastError(error, 'Delete user')
			},
			onSuccess: () => {
				toastr.success('Delete user', 'You deleted user successfully')
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
