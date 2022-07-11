import dynamic from 'next/dynamic'
import { FC } from 'react'

import Gallery from '@/components/ui/gallery/Gallery'

import Banner from '@/ui/banner/Banner'
import SubHeading from '@/ui/heading/SubHeading'

import Meta from '@/utils/meta/Meta'

import { IMoviePage } from '../../../../pages/movie/[slug]'

import Content from './content/Content'
import { useUpdateCountOpened } from './useUpdateCountOpened'

const DynamicPlayer = dynamic(() => import('@/ui/video-player/VideoPlayer'), {
	ssr: false,
})
const DynamicRateMovie = dynamic(() => import('./rateMovie/RateMovie'), {
	ssr: false,
})

const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	useUpdateCountOpened(movie.slug)
	return (
		<Meta title={movie.title} description={`Watch ${movie.title} online`}>
			<Banner image={movie.banner} Detail={() => <Content movie={movie} />} />

			<DynamicPlayer slug={movie.slug} videoSrc={movie.videoUrl} />

			<div className="mt-12">
				<SubHeading>Similar</SubHeading>
				<Gallery items={similarMovies} />
			</div>

			<DynamicRateMovie slug={movie.slug} id={movie._id} />
		</Meta>
	)
}

export default SingleMovie
