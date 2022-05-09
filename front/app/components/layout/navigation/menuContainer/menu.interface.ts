import { TypeMaterialIconName } from '../../../shared/types/icon.types'

export interface IMenuItem {
	icon: TypeMaterialIconName
	title: string
	path: string
}

export interface IMenu {
	title: string
	items: IMenuItem[]
}
