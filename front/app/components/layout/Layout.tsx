import { FC } from 'react'

import Navigation from './navigation/Navigation'
import Sidebar from './sidebar/Sidebar'
import styles from './layout.module.scss'
import Head from 'next/head'

const Layout: FC = (props: any) => {
	return (
    <>
		<div className={styles.wrapper}>
			<Navigation />
			<div className={styles.main}>{props.children}</div>
			<Sidebar />
		</div>
    </>
	)
}

export default Layout
