import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/ui/form-elements/Button'
import Field from '@/ui/form-elements/Field'
import Heading from '@/ui/heading/Heading'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import Meta from '@/utils/meta/Meta'

import { validEmail } from '../../../shared/regexp'

import styles from './Auth.module.scss'
import AuthFields from './AuthFields'
import { IAuthInput } from './auth.interface'
import { useAuthRedirect } from './useAuthRedirect'

const Auth: FC = (props) => {
	const [type, setType] = useState<'login' | 'register'>('login')

	useAuthRedirect()
	const { isLoading } = useAuth()
	const { login, register } = useActions()

	const {
		register: registerInput,
		handleSubmit,
		formState: { errors },
	} = useForm<IAuthInput>({
		mode: 'onBlur',
	})
	console.log(errors)

	const onSubmit: SubmitHandler<IAuthInput> = (data) => {
		if (type === 'login') {
			login(data)
		}
		if (type === 'register') register(data)
	}

	return (
		<Meta title="Auth">
			<section className={styles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Heading className="mb-6">Auth</Heading>
				
					<Field
						{...registerInput('email', {
							required: 'Email is required',
							pattern: {
								value: validEmail,
								message: 'Please, enter a valid email address',
							},
						})}
						type="email"
						error={errors.email}
						placeholder="E-mail"
						autoComplete="off"
						aria-label="Enter your email"
						aria-invalid={errors.email ? true : false}
					/>
					<Field
						{...registerInput('password', {
							required: 'Password is required',
							minLength: {
								value: 6,
								message: 'Password cannot be less than 8 characters',
							},
						})}
						type="Password"
						error={errors.password}
						placeholder="Enter your password"
						autoComplete="off"
						aria-label="Enter your password"
						aria-invalid={errors.password ? true : false}
					/>
					<div className={styles.btns}>
						<Button
							disabled={isLoading}
							type="submit"
							onClick={() => setType('login')}
						>
							Login
						</Button>
						<Button
							disabled={isLoading}
							type="submit"
							onClick={() => setType('register')}
						>
							Register
						</Button>
					</div>
				</form>
			</section>
		</Meta>
	)
}

export default Auth
