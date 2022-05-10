import { FC } from 'react'

import MovieItem from './MovieItem'
import { IMovieList } from './movie-list.interface'
import styles from './movieList.module.scss'
import Link from 'next/link'

const MovieList: FC<IMovieList> = ({ path, title, movies }) => {
	return (
		<div className={styles.list}>
			<div className={styles.heading}>{title}</div>
			{movies.map((movie) => (
				<MovieItem movie={movie} key={movie._id} />
			))}
      <Link href={path}>
        <a className={styles.btn}>
          See more
        </a>
      </Link>
		</div>
	)
}

export default MovieList
