import React from 'react'

import Header from '../components/Header/Header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	return (
		<div className="layout">
			<Header />
			<Component {...pageProps} />
		</div>
	)
}

export default MyApp
