import { FC } from 'react'

import MenuItem from './MenuItem'
import { IMenu } from './menu.interface'
import styles from './menu.module.scss'

const Menu: FC<{ menu: IMenu }> = ({ menu: {items, title} }) => {

	return (
		<nav className={styles.nav}>
			<span className={styles.heading}>{title}</span>
			<ul className={styles.list}>
				{items.map((item) => (
					<MenuItem item={item} key={item.path} />
				))}
			</ul>
		</nav>
	)
}

export default Menu
