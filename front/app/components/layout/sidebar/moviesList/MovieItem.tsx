import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import MaterialIcon from '@/components/ui/MaterialIcon'

import { getGenreUrl, getMovieUrl } from '@/configs/url.config'
import { IMovie } from '@/shared/types/movie.types'
import { getGenresListEach } from '@/utils/movie/getGenresList'

import styles from './movieList.module.scss'

const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.item}>
			<Link href={getMovieUrl(movie?.slug)}>
				<a>
					<Image
						src={movie?.poster}
						layout='fill'
						draggable={false}
						objectFit='cover'
						priority
						alt={movie?.title}
					/>
				</a>
			</Link>
			<div tabIndex={0} aria-label='Movie info	' className={styles.info}>
				<div>
					<div tabIndex={0} aria-label='Movie title' className={styles.title}>{movie?.title}</div>
					<div tabIndex={0} aria-label='Movie genres' className={styles.genres}>
						{movie?.genres?.map((genre, i) => (
							<Link key={genre._id} href={getGenreUrl(genre.slug)}>
								<a>{getGenresListEach(i, movie.genres.length, genre.name)}</a>
							</Link>
						))}
					</div>
				</div>
				{movie.rating > 0 && (
					<div tabIndex={0} aria-label='Movie rating' className={styles.rating}>
						<MaterialIcon name="MdStarRate" />
						<span tabIndex={0}>{movie.rating.toFixed(1)}</span>
					</div>
				)}
			</div>
		</div>
	)
}

export default MovieItem
