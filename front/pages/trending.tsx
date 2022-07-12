import { GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/ui/catalog-movies/Catalog'

import { movieService } from '../app/services/movie.service'

import { IMovieResponse } from './fresh'

const TrendingPage: NextPage<IMovieResponse> = ({
	items,
	total,
	limit,
	pages,
}) => {
	return (
		<Catalog
			movies={items || []}
			limit={limit}
			total={total}
			pages={pages}
			title="Trending movies"
			description="Trending movies for last couple of days"
		/>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data } = await movieService.getPopularMovies()

		return {
			props: {
				items: data.items,
				total: data.total,
				limit: data.limit,
				pages: data.pages,
			},
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default TrendingPage
