import { FC, useEffect } from 'react'
import { toastr } from 'react-redux-toastr'

import Gallery from '@/components/ui/gallery/Gallery'
import SubHeading from '@/components/ui/heading/SubHeading'
import Slider from '@/components/ui/slider/Slider'

import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import { IHome } from './home.interface'

const Home: FC<IHome> = ({ slides, actors, trendingMovies }) => {
	return (
		<Meta
			title="Watch movies online"
			description="Watch movies online or stream right to your browser"
		>
			<Heading className="text-gray-300 mb-8 text-xl">Home page</Heading>
			{slides?.length && <Slider slides={slides} />}
			<div className="my-10">
				<SubHeading aria-label="Trending movies this week">
					Trending now
				</SubHeading>
				{trendingMovies?.length && <Gallery items={trendingMovies} />}
			</div>

			<div className="my-10">
				<SubHeading aria-label="Best artists this week">
					Best artists
				</SubHeading>
				{actors?.length && <Gallery items={actors} />}
			</div>
		</Meta>
	)
}

export default Home
