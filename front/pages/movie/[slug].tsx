import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import SingleMovie from '@/screens/single-movie/SingleMovie'

import { IGalleryItem } from '@/ui/gallery/gallery.interface'

import { IMovie } from '@/shared/types/movie.types'

import { movieService } from '@/services/movie.service'

import { getMovieUrl } from '@/configs/url.config'

import Error404 from '../404'

export interface IMoviePage {
  similarMovies: IGalleryItem[]
  movie: IMovie
}

const MoviePage: NextPage<IMoviePage> = ({ similarMovies, movie }) => {

  return movie ? (
    <SingleMovie similarMovies={similarMovies || []} movie={movie} />
  ) : (
    <Error404 />
  )
}

export default MoviePage


export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data } = await movieService.getMovies()
    const paths = data.items.map((movie) => ({
      params: { slug: movie.slug },
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
    const { data: movie } = await movieService.getBySlug(String(params?.slug))
    const { data: dataSimilarMovies } = await movieService.getByGenres(
      movie.genres.map((item) => item._id)
    )

    const similarMovies: IGalleryItem[] = dataSimilarMovies
      .filter((item) => item._id !== movie._id)
      .map((item) => ({
        name: item.title,
        posterPath: item.poster,
        path: getMovieUrl(item.slug),
      }))

    return {
      props: {
        similarMovies,
        movie,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}