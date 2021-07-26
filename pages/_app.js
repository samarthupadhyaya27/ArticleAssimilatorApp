import '../styles/globals.css'
import { Fragment } from 'react'
import NavigationBar from '../components/NavigationBar'

function MyApp ({ Component, pageProps }) {
	return (
		<Fragment>
			<NavigationBar/>
			<Component {...pageProps} />
		</Fragment>
	)
}

export default MyApp
