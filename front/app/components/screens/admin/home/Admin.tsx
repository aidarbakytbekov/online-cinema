import { FC } from 'react'

import Meta from '@/utils/meta/Meta'

import styles from './Admin.module.scss'
import Statistics from './statistics/Statistics'
import Heading from '@/components/ui/heading/Heading'
import AdminNavigation from '@/ui/admin-navigation/AdminNavigation';

const Admin: FC = (props) => {
	return (
		<Meta title="Admin panel">
      <AdminNavigation/>
      <Heading>Some statistics</Heading>
			<Statistics />
		</Meta>
	)
}

export default Admin
