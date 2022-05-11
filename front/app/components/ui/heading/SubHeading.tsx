import { FC, ReactNode } from 'react';

const SubHeading: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<h2
			className={`text-white text-xl mb-5 font-semibold
    `}
		>
			{children}
		</h2>
	)
}

export default SubHeading
