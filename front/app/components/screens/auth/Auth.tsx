import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/ui/form-elements/Button'
import Heading from '@/ui/heading/Heading'

import { useAuth } from '@/hooks/useAuth'

import Meta from '@/utils/meta/Meta'

import { useActions } from '@/hooks/useActions'

import styles from './Auth.module.scss'
import AuthFields from './AuthFields'
import { IAuthInput } from './auth.interface'
import { useAuthRedirect } from './useAuthRedirect'

const Auth: FC = (props) => {
	const [type, setType] = useState<'login' | 'register'>('login')
	const { push } = useRouter()

	useAuthRedirect()
	const { isLoading } = useAuth()
	const { login, register } = useActions()

	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset,
	} = useForm<IAuthInput>({
		mode: 'onBlur',
	})

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
					<AuthFields
						formState={formState}
						register={registerInput}
						isPasswordRequired
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
