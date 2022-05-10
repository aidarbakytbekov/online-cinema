import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import MaterialIcon from '@/components/ui/MaterialIcon'

import { getGenreUrl, getMovieUrl } from '../../../../configs/url.config'
import { IMovie } from '../../../../shared/types/movie.types'
import { getGenresList } from '../../../../utils/movie/getGenresList'

import styles from './movieList.module.scss'

const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.item}>
			<Link href={getMovieUrl(movie?.slug)}>
				<a>
					<Image
						src={movie?.poster}
						width={65}
						height={97}
						draggable={false}
						priority
						alt={movie?.title}
					/>
				</a>
			</Link>
			<div className={styles.info}>
				<div>
					<div className={styles.title}>{movie?.title}</div>
					<div className={styles.genres}>
						{movie?.genres?.map((genre, i) => (
							<Link key={genre._id} href={getGenreUrl(genre.slug)}>
								<a>{getGenresList(i, movie.genres.length, genre.name)}</a>
							</Link>
						))}
					</div>
				</div>
				<div className={styles.rating}>
					<MaterialIcon name="MdStarRate" />
					<span>{movie.rating.toFixed(1)}</span>
				</div>
			</div>
		</div>
	)
}

export default MovieItem
