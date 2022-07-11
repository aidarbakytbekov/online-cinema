import { FC, ReactNode } from 'react'

import Header from './header/Header'
import styles from './layout.module.scss'
import Navigation from './navigation/Navigation'
import Sidebar from './sidebar/Sidebar'

interface ILayout {
	children: ReactNode
}

const Layout: FC<ILayout> = ({ children }) => {
	return (
		<>
			<div className={styles.wrapper}>
				<Header className={styles.header}/>
				<Navigation className={styles.nav} />
				<main className={styles.main}>{children}</main>
				<Sidebar className={styles.aside} />
			</div>
		</>
	)
}

export default Layout
