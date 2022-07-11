import { useQuery } from 'react-query';
import { userService } from '@/services/user.service';
import { useAuth } from '@/hooks/useAuth';
export const useFavorites = () => {
	const {user} = useAuth()
  const { isLoading, data: favoriteMovies, refetch } = useQuery(
		'favorite movies',
		() => userService.getFavorites(),
		{
			select: ({data}) => data,
			enabled: !!user
		},
	)

  return {
    isLoading, favoriteMovies, refetch
  }
}