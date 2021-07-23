import styles from '../styles/NavigationBar.module.css'
import { useRouter } from 'next/router'
import MailIcon from '@material-ui/icons/Mail'

const NavigationBar = () => {
	const router = useRouter()
	return (
		<div
			className={styles.navigationBar}
			onClick={() => router.push('/')}
		>
			<a>Article Assimilator</a>
			<div className={styles.navBarSpace}></div>
			<a href="mailto:samarthupadhyaya27@gmail.com">Contact</a>
			<MailIcon style={{
				color: 'white'
			}}/>
		</div>
	)
}

export default NavigationBar
