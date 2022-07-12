import type { AppProps } from 'next/app'
import Head from 'next/head'
import MainProvider from 'providers/MainProvider'

import '@/assets/styles/globals.scss'

import { TypeComponentAuthFields } from '../app/shared/types/auth.types'

type TypeAppProps = AppProps & TypeComponentAuthFields

function MyApp({ Component, pageProps, router }: TypeAppProps) {
	return (
		<>
			<Head>
				<title>Burn after watching</title>
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link rel="preconnect" href="https://mc.yandex.ru" />
				<meta property="og:url" content={process.env.APP_URL + router.asPath} />
			</Head>
			<MainProvider Component={Component}>
				<Component {...pageProps} />
			</MainProvider>
		</>
	)
}

export default MyApp
