import { FC } from 'react'

import AdminHeader from '@/components/ui/admin-table/adminHeader/AdminHeader'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'

import { useMovies } from './useMovies'

const MovieList: FC = () => {
	const { isLoading, handleSearch, keyword, data, deleteAsync, createAsync } = useMovies()

	return (
		<Meta title="Movies">
			<AdminNavigation />
			<Heading>Movies</Heading>
			<AdminHeader handleSearch={handleSearch} keyword={keyword} onClick={createAsync} />
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Title', 'Genres', 'Rating']}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default MovieList
