import { FC, ReactNode } from 'react'

import Navigation from './navigation/Navigation'
import Sidebar from './sidebar/Sidebar'
import styles from './layout.module.scss'

interface Props {
	children: ReactNode
}

const Layout: FC<Props> = ({children}: {children:  ReactNode}) => {
	return (
    <>
		<div className={styles.wrapper}>
			<Navigation />
			<div className={styles.main}>{children}</div>
			<Sidebar />
		</div>
    </>
	)
}

export default Layout
