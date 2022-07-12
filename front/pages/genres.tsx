import { GetStaticProps, NextPage } from 'next'

import Collection from '@/screens/collections/Collection'
import { ICollection } from '@/screens/collections/collections.interface'

import { genreService } from '@/services/genre.service'

import Error404 from './404'

const GenresPage: NextPage<{ collections: ICollection[] }> = ({
	collections,
}) => {
	return collections ? <Collection collections={collections} /> : <Error404 />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: collections } = await genreService.getCollections()

		return {
			props: {
				collections,
			},
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default GenresPage
