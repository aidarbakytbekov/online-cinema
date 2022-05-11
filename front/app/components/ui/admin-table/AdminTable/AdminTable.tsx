import { FC } from 'react'

import SkeletonLoader from '../../SkeletonLoader'

import styles from './AdminTable.module.scss'
import AdminTableHeader from './AdminTableHeader'
import AdminTableItem from './AdminTableItem'
import { ITableItem } from './admin-table.interface'

interface IAdminTable {
	tableItems: ITableItem[]
	isLoading: boolean
	headerItems: string[]
	removeHandler: (_id: string) => void
}

const AdminTable: FC<IAdminTable> = ({
	tableItems,
	removeHandler,
	isLoading,
	headerItems,
}) => {
	return (
		<>
			<AdminTableHeader headerItems={headerItems} />

			{isLoading ? (
				<SkeletonLoader count={tableItems?.length} height={48} className="mt-4" />
			) : tableItems?.length ? (
				tableItems?.map((tableItem) => (
					<AdminTableItem
						key={tableItem._id}
						removeHandler={() => removeHandler(tableItem._id)}
						tableItem={tableItem}
					/>
				))
			) : (
				<div className={styles.notFound}>Elements not found</div>
			)}
		</>
	)
}

export default AdminTable
