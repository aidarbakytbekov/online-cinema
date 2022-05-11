import { getAdminHomeUrl, getAdminUrl } from '../../../configs/url.config'

import { INavItem } from './admin-navigation.interface'

export const navItems: INavItem[] = [
	{
		title: 'Statistics',
		path: getAdminHomeUrl(),
	},
	{
		title: 'Users',
		path: getAdminUrl('users'),
	},
	{
		title: 'Movies',
		path: getAdminUrl('movies'),
	},
	{
		title: 'Actors',
		path: getAdminUrl('actors'),
	},
	{
		title: 'Genres',
		path: getAdminUrl('genres'),
	},
]
