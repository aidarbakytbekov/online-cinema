import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { IMovie } from '@/shared/types/movie.types'

import { getMovieUrl } from '@/configs/url.config'
import FavoriteButton from '../single-movie/FavoriteButton/FavoriteButton'

import styles from './Favorites.module.scss'

const FavoriteItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.itemWrapper}>
			<FavoriteButton movieId={movie._id} />
			<Link href={getMovieUrl(movie.slug)}>
				<a className={styles.item}>
					<Image
						src={movie.banner}
						alt={movie.title}
						layout="fill"
						draggable={false}
						priority
					/>
          <span className={styles.title}>{movie.title}</span>
				</a>
			</Link>
		</div>
	)
}

export default FavoriteItem
