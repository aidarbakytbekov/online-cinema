import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import MaterialIcon from '@/components/ui/MaterialIcon'

import { IMenuItem } from './menu.interface'
import styles from './menu.module.scss'

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
	const { asPath } = useRouter()
	return (
		<li
			className={cn({
				[styles.active]: asPath === item.path,
			})}
			aria-current={asPath === item.path ? 'page' : false}
		>
			<Link href={item.path}>
				<a>
					<div className={styles.icon}>
						<MaterialIcon name={item?.icon} />
					</div>
					<span className={styles.title}>{item?.title}</span>
				</a>
			</Link>
		</li>
	)
}

export default MenuItem
