import { FC } from 'react'

const NoFavorites: FC<{title: string}> = ({title}) => {
	return (
		<div className="mt-11 bg-gray-700 bg-opacity-20 py-3 px-5 rounded-lg text-white text-opacity-80">
			{title}
		</div>
	)
}

export default NoFavorites
