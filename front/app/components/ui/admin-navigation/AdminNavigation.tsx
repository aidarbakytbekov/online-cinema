import { FC } from 'react'

import styles from './AdminNavigation.module.scss'
import { navItems } from './admin-navigation.data';
import AdminNavItem from './AdminNavItem';
const AdminNavigation: FC = props => {
  return (
     <nav className={styles.nav}>
       <ul>
         {navItems.map(item => (
           <AdminNavItem key={item.path} item={item}/>
         ))}
       </ul>
     </nav>
   )
}

export default AdminNavigation