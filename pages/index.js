import Head from 'next/head'
import Link from 'next/link'

import styles from '../styles/Home.module.css'

export default function Home() {

	// Render the Landing Page
	return (
		<div className={styles.container}>
			<Head>
				<meta charSet="UTF-8" />
				<title>TunicaLabs Media</title>
				<meta name="description" content="Welcome to TunicaLabs Media." />
				<meta property="og:site_name" content="TunicaLabs Media"/>
				<meta property="og:url" content="https://www.tunicalabsmedia.tk/" />
				<meta property="og:image" content="https://www.tunicalabsmedia.tk/logo.png" />
				<meta property="og:locale" content="en_GB" />
				<meta name="referrer" content="origin" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="canonical" href="https://www.tunicalabsmedia.tk/" />
				<link rel="icon" href="/logo.png" type="image/icon type" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
				Welcome to TunicaLabs Media
				</h1>

				<p className={styles.description}>
				Hey I&apos;m Abir Ghosh. This is a demo page that contains links to the pages that were given as an assignment to me.
				</p>

				<div className={styles.grid}>
					<Link href="/signin">
						<a className={styles.card}>
							<h2>Sign In Page &rarr;</h2>
							<p>Contains a signin page</p>
						</a>
					</Link>
					<Link href="/signup">
						<a className={styles.card}>
							<h2>Sign Up Page &rarr;</h2>
							<p>Contains a signup page</p>
						</a>
					</Link>
					<Link href="/dashboard">
						<a className={styles.card}>
							<h2>Admin Page &rarr;</h2>
							<p>Contains an admin page</p>
						</a>
					</Link>
					<Link href="/upload">
						<a className={styles.card}>
							<h2>Upload Page &rarr;</h2>
							<p>Contains an upload page</p>
						</a>
					</Link>
				</div>
			</main>
		</div>
	)
}
