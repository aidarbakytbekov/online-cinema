import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/ui/catalog-movies/Catalog'

import { IActor, IMovie } from '@/shared/types/movie.types'

import { actorService } from '@/services/actor.service'
import { movieService } from '@/services/movie.service'

import Error404 from '../404'

interface IActorPage {
	movies: IMovie[]
	actor: IActor | undefined
}

const ActorPage: NextPage<IActorPage> = ({ movies, actor }) => {
	return actor ? (
		<Catalog movies={movies || []} title={`Movies with ${actor?.name}`} />
	) : (
		<Error404 />
	)
}

export default ActorPage

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: actors } = await actorService.getActors()
		const paths = actors.map((actor) => ({
			params: { slug: actor.slug },
		}))

		return {
			paths,
			fallback: 'blocking',
		}
	} catch (e) {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: actor } = await actorService.getBySlug(String(params?.slug))
		const { data: movies } = await movieService.getByActor(actor._id)
		console.log(movies)

		return {
			props: {
				movies,
				actor,
			},
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}
