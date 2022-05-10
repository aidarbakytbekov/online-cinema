import { FC } from 'react'

interface IHeading {
	children: string
	className?: string
}

const Heading: FC<IHeading> = ({ children, className }) => {
	return (
		<h1
			className={`text-white text-opacity-80 font-semibold ${
				className?.includes('xl') ? '' : 'text-3xl'
			} ${className}`}
		>
			{children}
		</h1>
	)
}

export default Heading
