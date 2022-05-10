import { FC } from 'react'


import Meta from '@/utils/meta/Meta'
import Heading from '@/ui/heading/Heading'

import { IHome } from './home.interface'

const Home: FC<IHome> = () => {
	return (
		<Meta
			title="Watch movies online"
			description="Watch movies online or stream right to your browser"
		>
			<Heading className='text-gray-300 mb-8 text-xl'>Home page</Heading>
		</Meta>
	)
}

export default Home