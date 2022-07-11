import { IMenu } from './menu.interface'

export const firstMenu: IMenu = {
	title: 'Menu',
	items: [
		{
			icon: 'MdHome',
			path: '/',
			title: 'Home',
		},
		{
			icon: 'MdExplore',
			path: '/genres',
			title: 'Discovery',
		},
		{
			icon: 'MdRefresh',
			path: '/fresh',
			title: 'Fresh movies',
		},
		{
			icon: 'MdLocalFireDepartment',
			path: '/trending',
			title: 'Trending now',
		},
		{
			icon: 'MdFavorite',
			path: '/favorites',
			title: 'Favorites',
		},
	],
}

export const userMenu: IMenu = {
	title: 'General',
	items: [],
}
