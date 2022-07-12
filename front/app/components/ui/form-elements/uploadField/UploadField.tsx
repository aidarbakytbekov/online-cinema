import cn from 'classnames'
import Image from 'next/image'
import { FC } from 'react'


import SkeletonLoader from '../../SkeletonLoader'
import { IUploadField } from '../form.interface'
import styles from '../form.module.scss'

import { useUpload } from './useUpload'
import MaterialIcon from '@/components/ui/MaterialIcon';

const UploadField: FC<IUploadField> = ({
	error,
	folder,
	placeholder,
	onChange,
	isNoImage = false,
	value,
	className,
	...rest
}) => {
	const { isLoading, uploadFile } = useUpload(onChange, folder)

	return (
		<div className={cn(styles.field, styles.uploadField)} {...rest}>
			<div className={styles.uploadFlex}>
				<label>
					<span>{placeholder}</span>
					<input type="file" onChange={uploadFile} />
					{error && <div className={styles.error}>{error.message}</div>}
				</label>

				{!isNoImage ? (
					<div className={styles.uploadImageContainer}>
						{isLoading ? (
							<SkeletonLoader count={1} className="w-full h-full" />
						) : (
							value && <Image src={value} alt="" layout="fill" unoptimized />
						)}
					</div>
				) : (
					<div className={styles.uploadImageContainer}>
						{isLoading ? (
							<SkeletonLoader count={1} className="w-full h-full" />
						) : (
							value && <div className={styles.videoText}>Video uploaded <MaterialIcon name='MdDone'/></div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default UploadField
