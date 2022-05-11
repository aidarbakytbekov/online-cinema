import { ChangeEvent, FC } from 'react'

import SearchField from '../../searchField/SearchField'
import AdminCreateButton from './AdminCreateButton'

import styles from './AdminHeader.module.scss'

interface iAdminHeader {
	onClick?: () => void
	keyword: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const AdminHeader: FC<iAdminHeader> = ({
	onClick,
	keyword,
	handleSearch,
}) => {
	return (
		<header className={styles.header}>
			<SearchField searchTerm={keyword} handleSearch={handleSearch} />
			{onClick && <AdminCreateButton onClick={onClick} />}
		</header>
	)
}

export default AdminHeader
