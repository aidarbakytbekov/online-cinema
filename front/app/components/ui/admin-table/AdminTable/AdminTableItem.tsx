import { FC } from 'react'

import styles from './AdminTable.module.scss'
import { IAdminTableItem } from './admin-table.interface'
import AdminActions from './adminActions/AdminActions'

const AdminTableItem: FC<IAdminTableItem> = ({ removeHandler, tableItem }) => {
	return (
    <div className={styles.item}>
      {tableItem.items?.map(val => <div key={val}>{val}</div>)}
      <AdminActions editUrl={tableItem.editUrl} removeHandler={removeHandler}/>
    </div>
  )
}

export default AdminTableItem
