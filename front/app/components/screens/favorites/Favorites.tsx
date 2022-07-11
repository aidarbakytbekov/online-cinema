import { FC } from 'react'
import styles from './Favorites.module.scss'
import Meta from '../../../utils/meta/Meta';
import Heading from '@/ui/heading/Heading';
import { useFavorites } from './useFavorites';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import FavoriteItem from './FavoriteItem';
import Description from '../../ui/heading/Description';
const Favorites: FC = (props) => {

  const {isLoading, favoriteMovies} = useFavorites()
  return (
    <Meta title="Your favorite movies">
    <Heading>Favorites</Heading>
      {!favoriteMovies?.length &&  <Description text='No movie in your list yet'/>}
    <section className={styles.favorites}>
      {isLoading ? (
        <SkeletonLoader
          count={3}
          className={styles.skeletonLoader}
          containerClassName={styles.containerLoader}
        />
      ) : (
        favoriteMovies?.map((movie) => (
          <FavoriteItem
            key={movie._id}
            movie={movie}
          />
        ))
      )}
    </section>
  </Meta>
   )
}

export default Favorites