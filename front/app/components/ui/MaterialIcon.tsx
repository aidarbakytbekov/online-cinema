import { FC } from 'react'
import * as MaterialIcons from 'react-icons/md'

import { useRenderClient } from '../../hooks/useRenderClient'
import { IMaterialIcon } from '../../shared/types/icon.types'

const MaterialIcon: FC<IMaterialIcon> = ({ name, className, ...rest }) => {
	const { isRenderClient } = useRenderClient()

	const IconComponent = MaterialIcons[name]
	if (isRenderClient) {
		return MaterialIcons[name] ? (
			<IconComponent className={className} {...rest}/>
		) : (
			<MaterialIcons.MdDragIndicator />
		)
	} else {
		return null
	}
}

export default MaterialIcon
