import type { GetStaticProps, NextPage } from 'next'

import Home from '@/components/screens/home/Home'

import { IHome } from '@/screens/home/home.interface'
import { IGalleryItem } from '@/ui/gallery/gallery.interface'
import { ISlide } from '@/ui/slider/slider.interface'
import { getActorUrl, getMovieUrl } from '@/configs/url.config'
import { actorService } from '@/services/actor.service'
import { movieService } from '@/services/movie.service'
import { getGenresList } from '@/utils/movie/getGenresList'

const HomePage: NextPage<IHome> = ({ slides, actors, trendingMovies }) => {
	return (
		<>
			<Home slides={slides} actors={actors} trendingMovies={trendingMovies} />
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data } = await movieService.getMovies()

		const slides: ISlide[] = data.items.slice(0, 3).map((movie) => ({
			_id: movie._id,
			path: getMovieUrl(movie.slug),
			banner: movie.banner,
			subTitle: getGenresList(movie.genres),
			title: movie.title,
		}))

		const { data: dataActors } = await actorService.getActors()

		const actors: IGalleryItem[] = dataActors.slice(0, 7).map((item) => ({
			name: item.name,
			posterPath: item.photo,
			path: getActorUrl(item.slug),
			content: {
				title: item.name,
				subtitle: `+${item.countMovies} movies`,
			},
		}))

		const {data: dataTrendingMovies} = await movieService.getPopularMovies()

		const trendingMovies: IGalleryItem[] = dataTrendingMovies.items
			.slice(0, 7)
			.map((item) => ({
				name: item.title,
				posterPath: item.poster,
				path: getMovieUrl(item.slug),
			}))

		return {
			props: {
				slides,
				actors,
				trendingMovies,
			} as IHome,
		}
	} catch (e) {
		return {
			props: {
				slides: [],
				actors: [],
				trendingMovies: [],
			},
		}
	}
}

export default HomePage
