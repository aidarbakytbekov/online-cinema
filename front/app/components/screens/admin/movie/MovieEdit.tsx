import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { stripHtml } from 'string-strip-html'

import SkeletonLoader from '@/ui/SkeletonLoader'
import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import Button from '@/ui/form-elements/Button'
import Field from '@/ui/form-elements/Field'
import formStyles from '@/ui/form-elements/admin-form.module.scss'
import SlugField from '@/ui/form-elements/slugField/SlugField'
import UploadField from '@/ui/form-elements/uploadField/UploadField'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'
import generateSlug from '@/utils/string/generateSlug'

import styles from './MovieEdit.module.scss'
import { IMovieEditInput } from './movie-edit.interface'
import { useAdminActors } from './useAdminActors'
import { useAdminGenres } from './useAdminGenres'
import { useMovieEdit } from './useMovieEdit'

const DynamicTextEditor = dynamic(
	() => import('@/ui/form-elements/TextEditor'),
	{
		ssr: false,
	}
)
const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
	ssr: false,
})

const MovieEdit: FC = (props) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
		resetField,
	} = useForm<IMovieEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useMovieEdit(setValue)
	const { isLoading: isActorsLoading, data: actors } = useAdminActors()
	const { isLoading: isGenresLoading, data: genres } = useAdminGenres()

	return (
		<Meta title="Edit movie">
			<AdminNavigation />
			<Heading>Edit Movie</Heading>
			<form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('title', {
									required: 'Title is required',
								})}
								placeholder="Title"
								error={errors.title}
							/>
							<SlugField
								register={register}
								error={errors.slug}
								generate={() =>
									setValue('slug', generateSlug(getValues('title')))
								}
							/>

							<Field
								{...register('parameters.country', {
									required: 'Country is required',
								})}
								placeholder="Country"
								error={errors.parameters?.country}
							/>
							<Field
								{...register('parameters.runtime', {
									required: 'Runtime is required',
								})}
								placeholder="Runtime"
								error={errors.parameters?.runtime}
							/>
							<Field
								{...register('parameters.releaseYear', {
									required: 'Year is required',
								})}
								placeholder="Year"
								error={errors.parameters?.releaseYear}
							/>
							<Controller
								name="genres"
								control={control}
								render={({ field, fieldState: { error } }) => (
									<DynamicSelect
										field={field}
										options={genres || []}
										isLoading={isGenresLoading}
										isMulti
										error={error}
										placeholder="Genres"
									/>
								)}
								rules={{
									required: 'Select at least one genre, please!',
								}}
							/>
							<Controller
								name="actors"
								control={control}
								render={({ field, fieldState: { error } }) => (
									<DynamicSelect
										field={field}
										options={actors || []}
										isLoading={isActorsLoading}
										isMulti
										error={error}
										placeholder="Actors"
									/>
								)}
								rules={{
									required: 'Select at least one actor, please!',
								}}
							/>
						</div>
						<div className={formStyles.fields}>
							<Controller
								name="poster"
								control={control}
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										value={value}
										folder="movies"
										error={error}
										placeholder="Poster"
									/>
								)}
								rules={{
									required: 'Poster is required',
								}}
							/>
							<Controller
								name="banner"
								control={control}
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										value={value}
										folder="movies"
										error={error}
										placeholder="Banner"
									/>
								)}
								rules={{
									required: 'Banner is required',
								}}
							/>
							<div className={styles.s}>
								<Controller
									name="videoUrl"
									control={control}
									defaultValue=""
									render={({
										field: { value, onChange },
										fieldState: { error },
									}) => (
										<UploadField
											onChange={onChange}
											value={value}
											folder="movies"
											error={error}
											placeholder="Video"
											style={{ marginTop: -25, width: '100%' }}
											isNoImage
										/>
									)}
								/>
								<button
									className={styles.reset}
									onClick={() => resetField('videoUrl')}
								>
									Clear Video
								</button>
							</div>
						</div>
						<Controller
							name="description"
							control={control}
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<DynamicTextEditor
									placeholder="Description"
									onChange={onChange}
									error={error}
									value={value}
								/>
							)}
							rules={{
								validate: {
									required: (v) =>
										(v && stripHtml(v).result.length > 0) ||
										'Description is required!',
								},
							}}
						/>
						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default MovieEdit
