import SkeletonLoader from '@/components/ui/SkeletonLoader';
import { FC } from 'react'
import { useQuery } from 'react-query';
import { movieService } from '@/services/movie.service';
import MovieList from './MovieList';

const PopularMovies: FC = () => {
  const {isLoading, data: popularMovies } = useQuery('popular movies on sidebar', () => movieService.getPopularMovies())

	return (
    isLoading 
      ? <div className='mt-11'>
      <SkeletonLoader count={3} className='h-28 mb-4'/>
    </div> 
      :  <MovieList path='/trending' movies={popularMovies?.slice(0, 3) || []} title='Popular movies'/>
  )
}

export default PopularMovies
