import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/ui/catalog-movies/Catalog'

import Error404 from '../404'
import { genreService } from '../../app/services/genre.service'
import { movieService } from '../../app/services/movie.service'
import { IGenre, IMovie } from '../../app/shared/types/movie.types'
import { IMovieResponse } from '../fresh'

interface IGenrePage extends IMovieResponse {
	genre: IGenre | undefined
}

const GenrePage: NextPage<IGenrePage> = ({
	items,
	total,
	pages,
	limit,
	genre,
}) => {
	return genre ? (
		<Catalog
			movies={items || []}
			limit={limit}
			total={total}
			pages={pages}
			title={genre?.name}
			description={genre?.description}
		/>
	) : (
		<Error404 />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: genres } = await genreService.getGenres()
		const paths = genres.map((g) => ({
			params: { slug: g.slug },
		}))

		return {
			paths,
			fallback: 'blocking',
		}
	} catch (error) {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: genre } = await genreService.getBySlug(String(params?.slug))
		const { data } = await movieService.getByGenres([genre._id])

		return {
			props: {
				items: data.items,
				limit: data.limit,
				pages: data.pages,
				total: data.total,
				genre,
			},
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default GenrePage
