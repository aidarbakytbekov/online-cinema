import { FC } from 'react'
import { usePopularGenres } from './usePopularGenres';
import Menu from '../Menu';

const GenreMenu: FC = () => {
  const {data, isLoading} = usePopularGenres()
	return (
    <>
    {isLoading ? <div>Loading...</div> : <Menu menu={{title: 'Popular genres', items: data || []}}/>}
    </>
  )
}

export default GenreMenu
