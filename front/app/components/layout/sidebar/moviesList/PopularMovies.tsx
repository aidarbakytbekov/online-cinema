import { FC } from 'react'
import { useQuery } from 'react-query'

import SkeletonLoader from '@/components/ui/SkeletonLoader'

import { movieService } from '@/services/movie.service'

import MovieList from './MovieList'

const PopularMovies: FC = () => {
	const { isLoading, data } = useQuery(
		'popular movies on sidebar',
		() => movieService.getPopularMovies()
	)

	return isLoading ? (
		<div className="mt-11">
			<SkeletonLoader count={3} className="h-28 mb-4" />
		</div>
	) : (
		<MovieList
			path="/trending"
			movies={data?.data.items.slice(0, 3) || []}
			title="Popular movies"
		/>
	)
}

export default PopularMovies
