import cn from 'classnames'
import { FC } from 'react'
import { useQuery } from 'react-query'

import SkeletonLoader from '@/components/ui/SkeletonLoader'

import { adminService } from '@/services/admin.service'

import styles from '../Admin.module.scss'

const CountUsers: FC = (props) => {
	const { isLoading, data: response } = useQuery('Count users', () =>
		adminService.getCountUsers()
	)
	return (
		<div className={cn(styles.block, styles.countUsers)}>
			<div>
				{isLoading ? (
					<SkeletonLoader />
				) : (
					<div className={styles.number}>{response?.data}</div>
				)}
        <div className={styles.description}>
          Users
        </div>
			</div>
		</div>
	)
}

export default CountUsers
