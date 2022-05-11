import { FC } from 'react'

import AdminHeader from '@/components/ui/admin-table/adminHeader/AdminHeader'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'

import { useUsers } from './useUsers'

const UserList: FC = () => {
	const { isLoading, handleSearch, keyword, data, deleteAsync } = useUsers()

	return (
		<Meta title="Users">
			<AdminNavigation />
			<Heading>Users</Heading>
			<AdminHeader handleSearch={handleSearch} keyword={keyword} />
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Email', 'Data register']}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default UserList
