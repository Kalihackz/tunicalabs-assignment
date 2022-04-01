import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import styles from '../styles/Signup.module.scss'

const signup = () => {

	// Render the Sign Up Page
	return (
		<div className={styles.container}>
			<Head>
				<meta charSet="UTF-8" />
				<title>Signup | TunicaLabs Media</title>
				<meta name="description" content="Sign Up to TunicaLabs Media." />
				<meta property="og:site_name" content="TunicaLabs Media"/>
				<meta property="og:url" content="https://www.tunicalabsmedia.tk/" />
				<meta property="og:image" content="https://www.tunicalabsmedia.tk/logo.png" />
				<meta property="og:locale" content="en_GB" />
				<meta name="referrer" content="origin" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="canonical" href="https://www.tunicalabsmedia.tk/" />
				<link rel="icon" href="/logo.png" type="image/icon type" />
			</Head>
			<div className={styles.signup}>
				<h2>Sign Up Now</h2>
				<div className={styles.email}>
					<input type="text" placeholder="Your Email*" name="email" id="email" autoComplete="off"/>
				</div>
				<div className={styles.password}>
					<input type="password" placeholder="Your Password*" name="password" id="password" autoComplete="off"/>
				</div>
				<div className={styles.confirmpassword}>
					<input type="password" placeholder="Confirm Password*" name="confirmpassword" id="confirmpassword" autoComplete="off"/>
				</div>
				<div className={styles.tos}>
					<label className={styles.check}>
						<input type="checkbox" name="tos" id="tos" />
						<span className={styles.checkmark}></span>
						<p>I agree to the Terms Of Services</p>
					</label>
				</div>
				<div className={styles.submit}>
					<input type="submit" value="Sign Up"/>
				</div>
				<div className={styles.signin}>
					<p>Already have an account? <Link href="/signin"><a><span>Sign In</span></a></Link></p>
				</div>
			</div>
		</div>
	)
}

export default signup
