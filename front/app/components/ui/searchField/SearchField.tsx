import { ChangeEvent, FC } from 'react'

import MaterialIcon from '../MaterialIcon'

import styles from './searchField.module.scss'

interface ISearchField {
	searchTerm: string
	handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

const SearchField: FC<ISearchField> = ({ searchTerm, handleSearch }) => {
	return (
		<div className={styles.search}>
			<MaterialIcon name="MdSearch" />
			<input
            type="text"
            placeholder="Search"
            onChange={handleSearch}
            value={searchTerm}
			/>
		</div>
	)
}

export default SearchField
