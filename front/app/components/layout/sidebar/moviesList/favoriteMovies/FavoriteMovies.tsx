import dynamic from 'next/dynamic'
import { FC } from 'react'

import { useFavorites } from '@/screens/favorites/useFavorites'

import SkeletonLoader from '@/components/ui/SkeletonLoader'

import { useAuth } from '@/hooks/useAuth'

import MovieList from '../MovieList'

import NoFavorites from './NotAuthFavorites'

const DynamicLoader = dynamic(() => import('@/ui/SkeletonLoader'), {
	ssr: false,
})

const FavoriteMovies: FC = () => {
	const { isLoading, favoriteMovies } = useFavorites()
	const { user } = useAuth()

	if (!user)
		return <NoFavorites title="For viewing favorites, please, sign in!" />
	if (!favoriteMovies?.length) {
		;<NoFavorites title="No movies yet" />
	}

	return isLoading ? (
		<div className="mt-11">
			<SkeletonLoader count={3} className="h-28 mb-4" />
		</div>
	) : favoriteMovies?.length ? (
		<MovieList
			movies={favoriteMovies?.slice(0, 3) || []}
			title="Favorite movies"
			path="/favorites"
		/>
	) : (
		<NoFavorites title="Here you can view your favorite movies! Add some of them" />
	)
}

export default FavoriteMovies
