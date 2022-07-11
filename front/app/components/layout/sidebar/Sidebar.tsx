import { FC } from 'react'

import { ISidebarProps } from './sidebar.interface'
import styles from './sidebar.module.scss'
import cn from 'classnames';
import PopularMovies from './moviesList/PopularMovies';
import dynamic from 'next/dynamic';

const DynamicFavorites = dynamic(() => import('./moviesList/favoriteMovies/FavoriteMovies'), {
	ssr: false,
})

const Sidebar: FC<ISidebarProps> = ({ className, ...rest }) => {
	return (
		<aside className={cn(styles.sidebar, className)} {...rest}>
			<PopularMovies/>
      <DynamicFavorites/>
		</aside>
	)
}

export default Sidebar
