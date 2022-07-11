import parse from 'html-react-parser'
import { FC } from 'react'

import { IMovie } from '@/shared/types/movie.types'

import { getActorUrl, getGenreUrl } from '@/configs/url.config'
import MaterialIcon from '@/ui/MaterialIcon'
import Overview from '../overview/Overview'

import styles from './Content.module.scss'
import { useAuth } from '@/hooks/useAuth';
import dynamic from 'next/dynamic';

const DynamicFavButton = dynamic(() => import('../FavoriteButton/FavoriteButton'), {
	ssr: false,
})

const Content: FC<{ movie: IMovie }> = ({ movie }) => {
	const {user} = useAuth()

	return (
		<div className={styles.content}>
			<h1>{movie.title}</h1>
			<div className={styles.details}>
				<span>{movie.parameters.releaseYear} · </span>
				<span>{movie.parameters.country} · </span>
				<span>{movie.parameters.runtime} min.</span>
			</div>
			<Overview
				name="Genres"
				paths={movie.genres.slice(0, 3).map((item) => ({
					_id: item._id,
					path: getGenreUrl(item.slug),
					title: item.name,
				}))}
			/>
			<Overview
				name="Actors"
				paths={movie.actors.slice(0, 3).map((item) => ({
					_id: item._id,
					path: getActorUrl(item.slug),
					title: item.name,
				}))}
			/>
			{user && <DynamicFavButton movieId={movie._id}/>}
			<div className={styles.description}>{parse(movie.description)}</div>
			{movie.rating > 0 && (
				<div className={styles.rating}>
					<MaterialIcon name="MdStarRate" />
					<span>{movie.rating.toFixed(1)}</span>
				</div>
			)}
		</div>
	)
}

export default Content
