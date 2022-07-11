import { GetStaticProps, NextPage, GetStaticPaths } from 'next';

import Catalog from '@/components/ui/catalog-movies/Catalog'

import { IMovie } from '../app/shared/types/movie.types'
import { movieService } from '../app/services/movie.service';

export interface IMovieResponse {
  items: IMovie[]
  total: number
  limit: number
  pages: number
}

const FreshPage: NextPage<IMovieResponse> = ({ items, total, limit, pages }) => {
	return (
		<Catalog
			movies={items || []}
      total={total}
      limit={limit}
      pages={pages}
			title="Fresh movies"
			description="New movies in excellent quality: legal, safe without ads"
		/>
	)
}


export const getStaticProps: GetStaticProps = async ({params}) => {
  try {
      const {data} = await movieService.getMovies()
      return {
        props: {
          items: data.items,
          total: data.total,
          limit: data.limit,
          pages: data.pages
        }
      }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

export default FreshPage
