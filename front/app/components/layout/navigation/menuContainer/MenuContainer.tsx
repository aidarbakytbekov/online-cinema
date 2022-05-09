import { FC } from 'react'
import GenreMenu from './genres/GenreMenu'

import Menu from './Menu'
import { firstMenu, userMenu } from './menu.data'
import styles from './menuContainer.module.scss'

const MenuContainer: FC = () => {
	return (
		<div>
			<Menu menu={firstMenu} />
			<GenreMenu/>
			{/* <Menu menu={userMenu} /> */}
		</div>
	)
}

export default MenuContainer
