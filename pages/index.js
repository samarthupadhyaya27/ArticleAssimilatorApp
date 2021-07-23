import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'

export default function Home () {
	const router = useRouter()

	const [formState, setFormState] = useState({
		websites: {
			medium: false,
			nytimes: false
		},
		readingTime: '',
		themes: '',
		readingSpeed: ''
	})
	const [websitesHidden, setWebsitesHidden] = useState(true)

	const toggleDropdown = () => {
		const ele = document.getElementById('readingWebsitesDropdown')
		if (websitesHidden) {
			setWebsitesHidden(false)
			ele.style.visibility = 'visible'
		} else {
			setWebsitesHidden(true)
			ele.style.visibility = 'hidden'
		}
	}

	const numOfSelectedWebsites = () => {
		let numSelectedWebsites = 0
		for (const website in formState.websites) {
			if (formState.websites[website]) {
				numSelectedWebsites++
			}
		}
		return numSelectedWebsites
	}

	const preventDefault = f => e => {
		e.preventDefault()
		f(e)
	}

	const findArticles = preventDefault(() => {
		const websites = []
		for (const website in formState.websites) {
			if (formState.websites[website]) {
				websites.push(website)
			}
		}
		const themes = formState.themes.split(',')
		console.log(themes)
		router.push({
			pathname: '/presentarticles',
			query: {
				websites,
				themes,
				reading_speed: formState.readingSpeed,
				reading_time: formState.readingTime
			}
		})
	})

	numOfSelectedWebsites()
	return (
		<form onSubmit={findArticles}>
			<div className={styles.container}>
				<div className={styles.grid}>
					<div className={styles.dropdown}>
						<button
							className={styles.readingWebsitesDropToggleButton}
							onClick={() => {
								toggleDropdown()
							}}>
							{numOfSelectedWebsites()} websites selected
						</button>
						<div
							id="readingWebsitesDropdown"
							className={styles.readingWebsitesDropdownContent}
						>
							<span>
								<input type="checkbox"
									id="medium"
									name="medium"
									value="medium"
									checked={formState.websites.medium}
									onChange={() => {
										const websites = formState.websites
										websites.medium = !websites.medium
										setFormState({ ...formState, websites })
									}}
								/>
								<label htmlFor="medium">Medium</label>
							</span>
							<span>
								<input
									type="checkbox"
									id="New York Times"
									name="New York Times"
									value="nytimes"
									checked={formState.websites.nytimes}
									onChange={() => {
										const websites = formState.websites
										websites.nytimes = !websites.nytimes
										setFormState({ ...formState, websites })
									}}
								/>
								<label htmlFor="New York Times">New York Times</label>
							</span>
						</div>
					</div>
					<p>Select which websites you would like to search</p>
					<input
						type="text"
						placeholder="Reading Time"
						value={formState.readingTime}
						onChange={(e) => {
							const re = /^[0-9\b]+$/
							if (e.target.value === '' || re.test(e.target.value)) {
								const readingTime = e.target.value
								setFormState({ ...formState, readingTime })
							}
						}}
					/>
					<p>Enter the time you have to read in minutes</p>
					<input
						type="text"
						placeholder="Theme 1, Theme 2, Theme 3"
						value={formState.themes}
						onChange={(e) => {
							const themes = e.target.value
							setFormState({ ...formState, themes })
						}}
						required
					/>
					<p>Input your themes separated by a comma</p>
					<input
						type="text"
						placeholder="Reading speed"
						value={formState.readingSpeed}
						onChange = {(e) => {
							const re = /^[0-9\b]+$/
							if (e.target.value === '' || re.test(e.target.value)) {
								const readingSpeed = e.target.value
								setFormState({ ...formState, readingSpeed })
							}
						}}
						required
					/>
					<p>(Optional) Enter your reading speed in words per minute</p>
				</div>
				<br/><br/><br/>
				<button
					type="submit"
					className={styles.findArticleButton}
				>Find me articles!</button>
				<br/><br/>
			</div>
		</form>
	)
}
