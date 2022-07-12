import Link from 'next/link'
import { FC } from 'react'

import { getMovieUrl } from '@/configs/url.config'

import styles from './AuthOverlay.module.scss'

const AuthButton: FC<{ slug: string }> = ({ slug }) => {
	return (
		<Link href={`/auth?redirect=${getMovieUrl(slug)}`}>
			<a className={styles.btn}>Sign in</a>
		</Link>
	)
}

export default AuthButton
