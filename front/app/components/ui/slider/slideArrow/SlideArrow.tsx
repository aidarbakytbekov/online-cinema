import cn from 'classnames'
import { FC } from 'react'

import MaterialIcon from '../../MaterialIcon'

import styles from './SlideArrow.module.scss'

interface IArrow {
	variant: 'left' | 'right'
	clickHandler: () => void
}

const SlideArrow: FC<IArrow> = ({ clickHandler, variant, ...rest }) => {
	const isLeft = variant === 'left'

	return (
		<button
			{...rest}
			onClick={clickHandler}
			className={cn(styles.arrow, {
				[styles.left]: isLeft,
				[styles.right]: !isLeft,
			})}
		>
			<MaterialIcon name={isLeft ? 'MdArrowBackIosNew' : 'MdArrowForwardIos'} />
		</button>
	)
}

export default SlideArrow
