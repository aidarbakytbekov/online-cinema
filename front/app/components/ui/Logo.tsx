import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'

import logo from '@/assets/images/logo.svg'

interface ILogoProps extends HTMLAttributes<HTMLAnchorElement> {}

const Logo: FC<ILogoProps> = ({ className, ...rest }) => {
	return (
		<Link href="/">
			<a
				className={cn(
					`flex items-center gap-3 text-xl uppercase font-semibold text-white`,
					className
				)}
				{...rest}
			>
				<Image
					src={logo}
					width={32}
					height={34}
					alt="Online cinema"
					draggable={false}
				/>
				Burn After Watching
			</a>
		</Link>
	)
}

export default Logo
