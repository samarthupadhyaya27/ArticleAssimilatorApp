import { useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home () {
	const { formState, setFormState } = useState({
		websites: [],
		readingTime: '',
		themes: '',
		readingSpeed: ''
	})
	return (
		<div className={styles.container}>
			<div className={styles.grid}>
				<input
					type="text"
					placeholder="Select websites below"
					onClick={() => {

					}}
				/>
				<p>Select which websites you would like to search</p>
				<input
					type="text"
					placeholder="Reading Time"
					value={formState.readingTime}
					onClick={() => {

					}}
				/>
				<p>Enter the time you have to read in minutes</p>
				<input
					type="text"
					placeholder="Theme 1, Theme 2, Theme 3"
					value={formState.themes}
					onClick={() => {

					}}
				/>
				<p>Input your themes separated by a comma</p>
				<input
					type="text"
					placeholder="Reading time"
					value={formState.readingTime}
					onClick = {() => {

					}} />
				<p>(Optional) Enter your reading speed in words per minute</p>
			</div>
		</div>
	)
}
