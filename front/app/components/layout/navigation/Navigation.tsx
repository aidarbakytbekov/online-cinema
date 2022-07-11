import cn from 'classnames'
import { FC } from 'react'

import Logo from '@/ui/Logo'
import MaterialIcon from '@/ui/MaterialIcon'
import Search from '@/ui/search/Search'


import Menu from './menu/Menu'
import GenreMenu from './menu/genres/GenreMenu'
import { firstMenu, userMenu } from './menu/menu.data'
import { INavigationProps } from './navigation.interface'
import styles from './navigation.module.scss'

const Navigation: FC<INavigationProps> = ({ className, ...rest }) => {
	return (
		<nav className={cn(styles.nav, className)} {...rest}>
			<div className={styles.logo}>
				<Logo className='px-layout'/>
			</div>
			<Search className={styles.search}/>
			<Menu menu={firstMenu} />
			<GenreMenu />
			<Menu menu={userMenu} />
		</nav>
	)
}

export default Navigation
