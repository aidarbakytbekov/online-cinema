import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'

import Button from '../form-elements/Button'

import styles from './Slider.module.scss'
import { ISlide } from './slider.interface'

interface ISlideItem {
	slide: ISlide
	buttonTitle?: string
}

const SlideItem: FC<ISlideItem> = ({ slide, buttonTitle = 'Watch' }) => {
	const { push } = useRouter()
	return (
		<div className={styles.slide}>
			{slide.banner && (
				<Image
					layout="fill"
					className={styles.image}
					src={slide.banner}
					alt={slide.title}
					draggable={false}
					unoptimized
					priority
				/>
			)}
			<div className={styles.content}>
				<div tabIndex={0} className={styles.heading}>
					{slide.title}
				</div>
				<div tabIndex={0} className={styles.subHeading}>
					{slide.subTitle}
				</div>
				<Button aria-label="Watch movie" onClick={() => push(slide.path)}>
					{buttonTitle}
				</Button>
			</div>
		</div>
	)
}

export default SlideItem
