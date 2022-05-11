import dynamic from 'next/dynamic'
import { FC } from 'react'

import MenuItem from './MenuItem'
import { IMenu } from './menu.interface'
import styles from './menu.module.scss'

const DynamicAuthItems = dynamic(() => import('./auth/AuthItems'), {
	ssr: false,
})

const Menu: FC<{ menu: IMenu }> = ({ menu: { items, title } }) => {
	return (
		<nav className={styles.nav}>
			<span className={styles.heading}>{title}</span>
			<ul className={styles.list}>
				{items.map((item) => (
					<MenuItem item={item} key={item.path} />
				))}
				{title === 'General' ? <DynamicAuthItems /> : null}
			</ul>
		</nav>
	)
}

export default Menu
