import { FC } from 'react'


import Meta from '@/utils/meta/Meta'
import Heading from '@/ui/heading/Heading'

import { IHome } from './home.interface'
import {toastr} from 'react-redux-toastr';

const Home: FC<IHome> = () => {
	return (
		<Meta
			title="Watch movies online"
			description="Watch movies online or stream right to your browser"
		>
			<Heading className='text-gray-300 mb-8 text-xl'>Home page</Heading>

			<button onClick={() => toastr.success('Auth', 'You have been successfully!')}>Show message</button>
		</Meta>
	)
}

export default Home
