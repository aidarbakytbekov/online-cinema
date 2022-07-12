import { NextPage } from 'next'

import Favorites from '@/components/screens/favorites/Favorites'

import { useAuth } from '../app/hooks/useAuth'

import Error404 from './404'

const FavoritesPage: NextPage = () => {
	const { user } = useAuth()
	return user ? <Favorites /> : <Error404 />
}

export default FavoritesPage
