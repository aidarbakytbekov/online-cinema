import Link from 'next/link'
import { FC, Fragment } from 'react'

import { IOverview } from '../content/content.interface'

import styles from './Overview.module.scss'

const Overview: FC<IOverview> = ({ paths, name }) => {
	return (
		<div className={styles.list}>
			<div className={styles.name}>{name}</div>
			<div className={styles.links}>
				{paths.map((item, idx) => (
					<Fragment key={idx}>
						<Link href={item.path}>
							<a>
                {item.title}
              </a>
						</Link>
            {idx + 1 !== paths.length ? ', ' : ''}
					</Fragment>
				))}
			</div>
		</div>
	)
}

export default Overview
