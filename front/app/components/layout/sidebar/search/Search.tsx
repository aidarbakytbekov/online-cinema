import { ChangeEvent, FC, useState } from 'react'
import { useQuery } from 'react-query'

import SearchField from '@/components/ui/searchField/SearchField'

import { useDebounce } from '@/hooks/useDebounce'

import { movieService } from '@/services/movie.service'

import styles from './search.module.scss'
import SearchList from './searchList/SearchList'

const Search: FC = () => {
	const [keyword, setKeyword] = useState('')
	const debouncedSearch = useDebounce(keyword, 500)

	const { isSuccess, data } = useQuery(
		['search movie list', debouncedSearch],
		() => movieService.getMovies(debouncedSearch),
		{
			select: ({ data }) => data,
			enabled: !!debouncedSearch,
		}
	)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value)
	}

	return (
		<div className={styles.wrapper}>
			<SearchField searchTerm={keyword} handleSearch={handleSearch} />
			{isSuccess && <SearchList movies={data || []} />}
		</div>
	)
}

export default Search
