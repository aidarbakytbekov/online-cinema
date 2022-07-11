import { FC } from 'react'

import AdminHeader from '@/components/ui/admin-table/adminHeader/AdminHeader'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'

import { useActors } from './useActors'

const ActorList: FC = () => {
	const { isLoading, handleSearch, keyword, data, deleteAsync, createAsync } = useActors()

	return (
		<Meta title="Actors">
			<AdminNavigation />
			<Heading>Actors</Heading>
			<AdminHeader handleSearch={handleSearch} keyword={keyword} onClick={createAsync} />
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Actor name', 'Movies count']}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default ActorList
