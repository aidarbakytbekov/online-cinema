import { useQuery } from 'react-query'

import { genreService } from '../../../../../services/genre.service'
import { IMenuItem } from '../menu.interface';
import { getGenreUrl } from '../../../../../configs/url.config';

export const usePopularGenres = () => {
	const queryData = useQuery('popular genre menu', () =>
		genreService.getGenres(), {
      select: ({data}) => data.map(item => ({
        icon: item.icon,
        path: getGenreUrl(item.slug),
        title: item.name
      }) as IMenuItem).slice(0, 4),
    },
	)

  return queryData
}
