import { ChangeEvent, FC } from 'react'

import Button from '@/ui/form-elements/Button'

import SearchField from '../../searchField/SearchField'

import styles from './AdminHeader.module.scss'

interface IAdminHeader {
	onClick?: () => void
	keyword: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const AdminHeader: FC<IAdminHeader> = ({ onClick, keyword, handleSearch }) => {
	return (
		<header className={styles.header}>
			<SearchField searchTerm={keyword} handleSearch={handleSearch} />
			{onClick && <Button onClick={onClick}>Create New</Button>}
		</header>
	)
}

export default AdminHeader
