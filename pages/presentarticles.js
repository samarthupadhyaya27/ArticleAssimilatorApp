import PropTypes from 'prop-types'
import styles from '../styles/presentarticles.module.css'

export const getServerSideProps = async (context) => {
	const url = new URL('http://localhost:5000')
	url.searchParams.append('reading_time', context.query.reading_time)
	url.searchParams.append('reading_speed', context.query.reading_speed)
	for (const theme in context.query.themes) {
		url.searchParams.append('themes', context.query.themes[theme])
	}
	for (const website in context.query.websites) {
		url.searchParams.append('websites', context.query.websites[website])
	}
	const res = await fetch(url, {
		method: 'GET'
	})
	const data = await res.json()
	return {
		props: data
	}
}

const PresentArticles = (props) => {
	const renderedArticles = props.articles.map((article, index) => {
		return (
			<div key={index}>
				<a href={article.url}>{article.title}</a>
			</div>
		)
	})

	return (
		<div className={styles.container}>
			<h1>Reading Time: {props.reading_time.toFixed(2)}</h1>
			<div className={styles.articlesContainer}>
				{renderedArticles}
			</div>
			<br/>
		</div>
	)
}

PresentArticles.propTypes = {
	articles: PropTypes.array,
	reading_time: PropTypes.number
}

export default PresentArticles
