import { FC } from 'react'
import Logo from './Logo'

import styles from './navigation.module.scss'
import MenuContainer from './menuContainer/MenuContainer';

const Navigation: FC = () => {
	return <nav className={styles.nav}>
    <Logo/>
    <MenuContainer/>
  </nav>
}

export default Navigation
