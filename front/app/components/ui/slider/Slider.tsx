import { FC } from 'react'
import { CSSTransition } from 'react-transition-group'

import SlideItem from './SlideItem'
import styles from './Slider.module.scss'
import SlideArrow from './slideArrow/SlideArrow'
import { ISlide } from './slider.interface'
import { useSlider } from './useSlider'

interface ISlider {
	slides: ISlide[]
	buttonTitle?: string
}

const Slider: FC<ISlider> = ({ slides, buttonTitle }) => {
	const { handleClick, isNext, isPrev, currentIndex, slideIn } = useSlider(
		slides.length
	)

	return (
		<div tabIndex={0} aria-label='Slider' className={styles.slider}>
			<CSSTransition
				in={slideIn}
				classNames="slide-animation"
				timeout={300}
				unmountOnExit
			>
				<SlideItem slide={slides[currentIndex]} buttonTitle={buttonTitle} />
			</CSSTransition>
			{isPrev && (
				<SlideArrow aria-label='Previous slide' variant="left" clickHandler={() => handleClick('prev')} />
			)}

			{isNext && (
				<SlideArrow aria-label='Next slide' variant="right" clickHandler={() => handleClick('next')} />
			)}
		</div>
	)
}

export default Slider
