import { FC, useState } from 'react'

import { IMovie } from '@/shared/types/movie.types'

import { movieService } from '@/services/movie.service'

import Meta from '@/utils/meta/Meta'

import { getMovieUrl } from '@/configs/url.config'

import Button from '../form-elements/Button'
import GalleryItem from '../gallery/GalleryItem'
import Description from '../heading/Description'
import Heading from '../heading/Heading'

import styles from './Catalog.module.scss'
import { ICatalog } from './catalog.interface'

const Catalog: FC<ICatalog> = ({ title, description, movies, pages }) => {

	const [items, setItems] = useState<IMovie[] | []>(movies)
	const [currentPage, setCurrentPage] = useState<number>(2)
	const loadMore = async () => {
		setCurrentPage((prev) => prev + 1)
		let res
		switch (title) {
			case 'Fresh movies':
				res = await movieService.getMovies({
					page: currentPage,
				})
				break
			case 'Trending movies':
				res = await movieService.getPopularMovies({
					page: currentPage,
				})
				break
		}
		setItems((prev) => [...prev, ...res.data.items])
	}

	return (
		<Meta title={title} description={description}>
			<Heading className={styles.heading}>{title}</Heading>

			{description && (
				<Description className={styles.description} text={description} />
			)}
			<div className={styles.wrapper}>
				<section className={styles.moviesGrid}>
					{movies?.map((item) => (
						<GalleryItem
							key={item._id}
							item={{
								name: item.title,
								path: getMovieUrl(item.slug),
								posterPath: item.banner,
								content: {
									title: item.title,
								},
							}}
							variant="horizontal"
						/>
					))}
				</section>
				{currentPage <= pages && (
					<Button onClick={loadMore} className={styles.btn}>
						Load more
					</Button>
				)}
			</div>
		</Meta>
	)
}

export default Catalog
