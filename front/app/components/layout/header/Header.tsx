import cn from 'classnames'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import Logo from '@/ui/Logo'
import MaterialIcon from '@/ui/MaterialIcon'

import Navigation from '../navigation/Navigation'

import styles from './Header.module.scss'
import { IHeaderProps } from './header.interface'

const Header: FC<IHeaderProps> = ({ className, ...rest }) => {
	const router = useRouter()
	const [isOpenedMenu, setIsOpenedMenu] = useState<boolean>(false)
	useEffect(() => {
		setIsOpenedMenu(false)
	}, [router])

	const variants = {
		opened: {
			x: 0,
		},
		closed: {
			x: -100,
		},
	}
	return (
		<header className={cn(styles.header, className)} {...rest}>
			<Logo />
			<div
				onClick={() => setIsOpenedMenu(true)}
				className={cn(styles.burgerMenu, {
					[styles.active]: isOpenedMenu,
				})}
			>
				<span></span>
			</div>
			<div
				className={cn(styles.mobileMenu, {
					[styles.active]: isOpenedMenu,
				})}
			>
				<Navigation />
				<MaterialIcon
					onClick={() => setIsOpenedMenu(false)}
					className={styles.close}
					name="MdClose"
				/>
			</div>
		</header>
	)
}

export default Header
