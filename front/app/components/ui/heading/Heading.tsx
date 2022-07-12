import { FC, HTMLAttributes } from 'react'

import { IHeading } from './heading.interface'

const Heading: FC<IHeading> = ({ children, className, ...rest }) => {
	return (
		<h1
			{...rest}
			tabIndex={0}
			className={`text-white text-opacity-80 font-semibold ${
				className?.includes('xl') ? '' : 'text-3xl'
			} ${className}`}
		>
			{children}
		</h1>
	)
}

export default Heading
