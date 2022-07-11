import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { userService } from '@/services/user.service'
import { toastError } from '@/utils/toast-error'

import { IProfileInput } from './profile.interfacec'

export const useProfile = (setValue: UseFormSetValue<IProfileInput>) => {
	const { isLoading } = useQuery(
		'user profile',
		() => userService.getProfile(),
		{
			onSuccess: ({ data }) => {
				setValue('email', data.email)
			},
			onError: (err) => {
				toastError(err, 'User Profile')
			},
		}
	)

	const { mutateAsync } = useMutation(
		'update profile',
		(data: IProfileInput) => userService.updateProfile(data),
		{
			onSuccess: () => {
				toastr.success('Update profile', 'You updated profile successfully')
			},
			onError: (err) => {
				toastError(err, 'Update profile')
			},
		}
	)

	const onSubmit: SubmitHandler<IProfileInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
