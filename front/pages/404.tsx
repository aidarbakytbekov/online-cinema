import Heading from '@/components/ui/heading/Heading'
import Meta from '@/utils/meta/Meta'
import { FC } from 'react'

const Error404: FC = () => {
	return (
    <Meta title='Page not found'>
      <Heading>404 | Page not found</Heading>
    </Meta>
  )
}

export default Error404
