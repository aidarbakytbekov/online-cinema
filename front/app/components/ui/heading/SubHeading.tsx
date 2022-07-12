import { FC, ReactNode } from 'react';
import { IHeading } from './heading.interface';
import cn from 'classnames';


const SubHeading: FC<IHeading> = ({ children, className, ...rest }) => {
	return (
		<h2 tabIndex={0}
			className={cn(`text-white text-xl mb-5 font-semibold
    `, className)} {...rest}
		>
			{children}
		</h2>
	)
}

export default SubHeading
