import PropTypes from 'prop-types'
import styles from '../styles/presentarticles.module.css'

export const getServerSideProps = async (context) => {
	let url = new URL('http://localhost:5000')
	if (Object.prototype.hasOwnProperty.call(context.query, 'reading_time')) {
		url.searchParams.append('reading_time', context.query.reading_time)
	}
	if (Object.prototype.hasOwnProperty.call(context.query, 'reading_speed')) {
		url.searchParams.append('reading_speed', context.query.reading_speed)
	}
	if (Object.prototype.hasOwnProperty.call(context.query, 'themes')) {
		for (const theme in context.query.themes) {
			url.searchParams.append('themes', context.query.themes[theme])
		}
	}
	if (Object.prototype.hasOwnProperty.call(context.query, 'websites')) {
		for (const website in context.query.websites) {
			url.searchParams.append('websites', context.query.websites[website])
		}
	}
	url = url.toString()
	try {
		const res = await fetch(url, {
			method: 'GET'
		})
		const data = await res.json()
		return {
			props: data
		}
	} catch (err) {
		console.error(err)
		return {
			props: {
				reading_time: 0,
				articles: []
			}
		}
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
