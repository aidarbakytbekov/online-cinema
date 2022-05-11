import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { useQuery } from 'react-query'

import SkeletonLoader from '@/components/ui/SkeletonLoader'

import SubHeading from '@/ui/heading/SubHeading'

import { IMovie } from '@/shared/types/movie.types'

import { movieService } from '@/services/movie.service'

import { getMovieUrl } from '../../../../../configs/url.config'
import styles from '../Admin.module.scss'

const PopularMovie: FC = (props) => {
	const { isLoading, data: movie } = useQuery(
		'Most popular movie in admin',
		() => movieService.getPopularMovies(),
		{
			select: (data): IMovie => data[0],
		}
	)
	return (
		<div className={cn(styles.block, styles.popular)}>
			<SubHeading>The most popular movie</SubHeading>
			{isLoading ? (
				<SkeletonLoader className="h-48" />
			) : (
				movie && (
					<>
						<span>{movie?.title}</span>
						<h3>Watched {movie?.countOpened} times</h3>
						<Link href={getMovieUrl(movie.slug)}>
							<a >
								<Image
									src={movie.banner}
									width={285}
									height={176}
									alt={movie.title}
									className={styles.image}
									unoptimized
									draggable={false}
								/>
							</a>
						</Link>
					</>
				)
			)}
		</div>
	)
}

export default PopularMovie
