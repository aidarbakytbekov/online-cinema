import MovieList from '@/screens/admin/movies/MovieList';
import { NextPageAuth } from '@/shared/types/auth.types';

const MovieListPage: NextPageAuth = props => {
  return (
     <MovieList/>
   )
}

MovieListPage.isOnlyAdmin = true

export default MovieListPage