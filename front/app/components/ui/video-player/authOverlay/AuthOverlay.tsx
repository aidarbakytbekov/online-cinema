import { FC } from 'react'

import AuthButton from './AuthButton'
import styles from './AuthOverlay.module.scss'

const AuthOverlay: FC<{ slug: string }> = ({ slug }) => {
	return (
		<div className={styles.overlay}>
			<div>
				<div>Sign in, please, to start watching </div>
				<AuthButton slug={slug} />
			</div>
		</div>
	)
}

export default AuthOverlay
