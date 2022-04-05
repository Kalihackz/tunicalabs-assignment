import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import CookiesServerSide from 'cookies'

import styles from '../styles/Signin.module.scss'

// Sign in to web app
const Signin = () => {

	const router = useRouter()

	// Holds login data
	const [formData, setFormData] = React.useState(
		{
			email: "",
			password: ""
		}
	);

	// Handles login data
	function handleChange(event) {

		const { name, type, value, checked } = event.target;

		setFormData((prevFormData) => {

			return {
				...prevFormData,
				[name]: type === 'checkbox' ? checked : value
			};

		});

	}

	// Submits login data to server
	function handleSubmit(event) {

		event.preventDefault();

		fetch('/api/v1/auth', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'multipart/form-data'
			},
			body: JSON.stringify(formData)
		}
		)
			.then((resp) => resp.json())
			.then((data) => {

				if (data.success === 'true') {

					Cookies.set('identification', data.cookie, { secure: false })
					return router.push('/dashboard')
				}

				return alert('Login Failed')

			})

	}

	// Render the Sign In Page
	return (
		<div className={styles.container}>
			<Head>
				<meta charSet="UTF-8" />
				<title>Signin | TunicaLabs Media</title>
				<meta name="description" content="Sign In to TunicaLabs Media." />
				<meta property="og:site_name" content="TunicaLabs Media" />
				<meta property="og:url" content="https://www.tunicalabsmedia.tk/" />
				<meta property="og:image" content="https://www.tunicalabsmedia.tk/logo.png" />
				<meta property="og:locale" content="en_GB" />
				<meta name="referrer" content="origin" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="canonical" href="https://www.tunicalabsmedia.tk/" />
				<link rel="icon" href="/logo.png" type="image/icon type" />
			</Head>
			<form className={styles.signin} onSubmit={handleSubmit}>
				<h2>Sign In Now</h2>
				<div className={styles.email}>
					<input
						type="text"
						placeholder="Your Email*"
						name="email"
						id="email"
						autoComplete="off"
						onChange={handleChange}
						value={formData.email}
						required
					/>
				</div>
				<div className={styles.password}>
					<input
						type="password"
						placeholder="Your Password*"
						name="password"
						id="password"
						autoComplete="off"
						onChange={handleChange}
						value={formData.password}
						required
					/>
				</div>
				<div className={styles.tos}>
					<label className={styles.check}>
						<input type="checkbox" name="tos" id="tos" />
						<span className={styles.checkmark}></span>
						<p>I agree to the Terms Of Services</p>
					</label>
				</div>
				<div className={styles.submit}>
					<input type="submit" value="Sign In" />
				</div>
				<div className={styles.signup}>
					<p>Don&apos;t have an account? <Link href="/signup"><a><span>Sign Up</span></a></Link></p>
				</div>
			</form>
		</div>
	)
}

export default Signin

// Checks whether an user is logged in or not
export async function getServerSideProps({ req, res }) {

	const cookies = new CookiesServerSide(req, res)

	console.log(cookies.get('identification'))

	if (cookies.get('identification') === 'abir12345@hashed') {
		return {
			redirect:
			{
				destination: '/dashboard',
				permanent: false,
			},
		}
	}

	return {
		props: {}, // will be passed to the page component as props
	}

}