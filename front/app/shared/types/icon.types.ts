import { HTMLAttributes } from 'react'
import * as MaterialIcons from 'react-icons/md'

export type TypeMaterialIconName = keyof typeof MaterialIcons

export interface IMaterialIcon extends HTMLAttributes<SVGElement> {
	name: TypeMaterialIconName
}
