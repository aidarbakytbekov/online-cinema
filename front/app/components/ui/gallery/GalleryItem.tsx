import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import styles from './Gallery.module.scss'
import { IGalleryItemProps } from './gallery.interface'

const GalleryItem: FC<IGalleryItemProps> = ({ item, variant }) => {
	return (
		<Link href={item.path}>
			<a
				className={cn(styles.item, {
					[styles.withText]: item.content,
					[styles.horizontal]: variant === 'horizontal',
					[styles.vertical]: variant === 'vertical',
				})}
			>
				<Image
					alt={item.name}
					src={item.posterPath}
					draggable={false}
					layout="fill"
					priority
				/>
				{item.content && (
					<div className={styles.content}>
						<div className={styles.title}>{item.content.title}</div>
						{item.content.subtitle && (
							<div className={styles.subtitle}>{item.content.subtitle}</div>
						)}
					</div>
				)}
			</a>
		</Link>
	)
}

export default GalleryItem
