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
		<>
		<div className={styles.list}>
			<span tabIndex={0} className={styles.heading}>{title}</span>
			<ul className={styles.list}>
				{items.map((item) => (
					<MenuItem item={item} key={item.path} />
				))}
				{title === 'General' ? <DynamicAuthItems /> : null}
			</ul>
		</div>
		</>
	)
}

export default Menu
