import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { userService } from '@/services/user.service'

import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/configs/url.config'

import { IUserEditInput } from './user-edit.interface'

export const useUserEdit = (setValue: UseFormSetValue<IUserEditInput>) => {
	const { push, query } = useRouter()

	const userId = String(query.id)

	const { isLoading } = useQuery(
		['user by id', userId],
		() => userService.getUserById(userId),
		{
			onSuccess: ({ data }) => {
				setValue('email', data.email), setValue('isAdmin', data.isAdmin)
			},
			onError: (err) => {
				toastError(err, 'Get user')
			},
			enabled: !!query.id,
		}
	)

	const { mutateAsync } = useMutation(
		'update user',
		(data: IUserEditInput) => userService.updateUser(userId, data),
		{
			onSuccess: () => {
				toastr.success('Update user', 'You updated user successfully')
				push(getAdminUrl('users'))
			},
			onError: (err) => {
				toastError(err, 'Update user')
			},
		}
	)

	const onSubmit: SubmitHandler<IUserEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
