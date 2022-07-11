import { FC } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'

import Field from '@/ui/form-elements/Field'

import { validEmail } from '@/shared/regexp'

interface IAuthFields {
	register: UseFormRegister<any>
	formState: FormState<any>
	isPasswordRequired?: boolean
}

const AuthFields: FC<IAuthFields> = ({
	formState: { errors },
	isPasswordRequired = false,
	register,
}) => {

	return (
		<>
			<Field
				{...register('email', {
					required: 'Email is required',
					pattern: {
						value: validEmail,
						message: 'Please, enter a valid email address',
					},
				})}
        type='email'
				error={errors.email}
				placeholder="E-mail"
				autoComplete='off'
				aria-label="Enter your email"
				aria-invalid={errors.email ? true : false}
			/>
			<Field
				{...register('password', isPasswordRequired ? {
					required: 'Password is required',
					minLength: {
            value: 6,
            message: 'Password cannot be less than 8 characters'
          }
				} : {})}
        type='Password'
				error={errors.password}
				placeholder="Enter your  password"
				autoComplete='off'
				aria-label="Enter your password"
				aria-invalid={errors.password ? true : false}
			/>
		</>
	)
}

export default AuthFields
