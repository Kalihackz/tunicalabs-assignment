import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import styles from '../styles/Signin.module.scss'

const signin = () => {

	// Render the Sign In Page
	return (
		<div className={styles.container}>
 	      	<Head>
				<meta charSet="UTF-8" />
				<title>Signin | TunicaLabs Media</title>
				<meta name="description" content="Sign In to TunicaLabs Media." />
				<meta property="og:site_name" content="TunicaLabs Media"/>
				<meta property="og:url" content="https://www.tunicalabsmedia.tk/" />
				<meta property="og:image" content="https://www.tunicalabsmedia.tk/logo.png" />
				<meta property="og:locale" content="en_GB" />
				<meta name="referrer" content="origin" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="canonical" href="https://www.tunicalabsmedia.tk/" />
				<link rel="icon" href="/logo.png" type="image/icon type" />
			</Head>
			<div className={styles.signin}>
				<h2>Sign In Now</h2>
				<div className={styles.email}>
					<input type="text" placeholder="Your Email*" name="email" id="email" autoComplete="off"/>
				</div>
				<div className={styles.password}>
					<input type="password" placeholder="Your Password*" name="password" id="password" autoComplete="off"/>
				</div>
				<div className={styles.tos}>
					<label className={styles.check}>
						<input type="checkbox" name="tos" id="tos" />
						<span className={styles.checkmark}></span>
						<p>I agree to the Terms Of Services</p>
					</label>
				</div>
				<div className={styles.submit}>
					<input type="submit" value="Sign In"/>
				</div>
				<div className={styles.signup}>
					<p>Don&apos;t have an account? <Link href="/signup"><a><span>Sign Up</span></a></Link></p>
				</div>
			</div>
		</div>
	)
}

export default signin
