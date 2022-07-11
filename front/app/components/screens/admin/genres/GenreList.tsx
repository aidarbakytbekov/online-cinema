import { FC } from 'react'

import AdminHeader from '@/components/ui/admin-table/adminHeader/AdminHeader'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import { useGenres } from './useGenres'

const GenreList: FC = () => {
	const { isLoading, handleSearch, keyword, data, deleteAsync, createAsync } = useGenres()

	return (
		<Meta title="Genres">
			<AdminNavigation />
			<Heading>Genres</Heading>
			<AdminHeader handleSearch={handleSearch} keyword={keyword} onClick={createAsync}/>
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Genre name', 'Genre slug']}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default GenreList
