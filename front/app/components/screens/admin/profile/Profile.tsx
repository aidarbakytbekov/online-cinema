import { FC } from 'react'
import { useForm } from 'react-hook-form'

import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Button from '@/components/ui/form-elements/Button'

import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import AuthFields from '../../auth/AuthFields'

import styles from './Profile.module.scss'
import { IProfileInput } from './profile.interfacec'
import { useProfile } from './useProfile'

const Profile: FC = (props) => {
	const { handleSubmit, register, formState, setValue } =
		useForm<IProfileInput>({
			mode: 'onChange',
		})

	const { isLoading, onSubmit } = useProfile(setValue)

	return (
		<Meta title="Update profile">
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Heading className="mb-6">Update profile</Heading>
				{isLoading ? (
					<SkeletonLoader height={40} count={2} />
				) : (
					<AuthFields formState={formState} register={register} />
				)}
				<div className={styles.btns}>
					<Button>Update</Button>
				</div>
			</form>
		</Meta>
	)
}

export default Profile
