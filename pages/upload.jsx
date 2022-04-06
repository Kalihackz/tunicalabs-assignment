import React from 'react'
import Head from 'next/head'
import SelectData from '../components/SelectData/SelectData'
import Sidebar from '../components/Sidebar/Sidebar'
import Cookies from 'cookies'

import styles from '../styles/Upload.module.scss'

const Upload = () => {

	// Make a schools state variable array for holding schools data
	const [schools, setSchools] = React.useState([]);

	// Make a terms state variable array for holding classes data
	const [terms, setTerms] = React.useState([]);

	// Make a divisions state variable array for holding divisions data
	const [divisions, setDivisions] = React.useState([]);

	// Fetch function for Select Option Filtering
	function fetchSelectOptions(url, setCB) {

		fetch(url)
			.then(res => res.json())
			.then(data => {
				if (data && data.success === 'true') {
					return setCB(data.data)
				}
				return alert("Forbidden error")
			})
			.catch(error => {
				console.error("Can't fetch data from server")
			})

	}

	// Fetch Data
	React.useEffect(() => {

		// Fetch School Data
		fetchSelectOptions(`/api/v1/schools`, setSchools)

		// Fetch Class Data
		fetchSelectOptions(`/api/v1/classes`, setTerms)

		// Fetch Division Data
		fetchSelectOptions(`/api/v1/divisions`, setDivisions)

	}, [])

	// Holds the new student form data
	const [formData, setFormData] = React.useState(
		{
			name: "",
			dob: "",
			school: "",
			class: "",
			division: "",
			status: ""
		}
	);

	// Handles the student new data
	function handleChange(event) {

		const { name, type, value, checked } = event.target;

		setFormData((prevFormData) => {

			return {
				...prevFormData,
				[name]: type === 'checkbox' ? checked : value
			};

		});

	}

	// Submits the new data to server
	function handleSubmit(event) {

		event.preventDefault();

		fetch('/api/v1/add', {
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

				if (data && data.success === 'true') {
					return alert('Saved Data')
				}
				return alert('Not saved')
			})

	}

	// Render Upload UI
	return (
		<main className={styles.main}>
			<Head>
				<meta charSet="UTF-8" />
				<title>Add Student | TunicaLabs Media</title>
				<meta name="description" content="Add Student to TunicaLabs Media." />
				<meta property="og:site_name" content="TunicaLabs Media" />
				<meta property="og:url" content="https://www.tunicalabsmedia.tk/" />
				<meta property="og:image" content="https://www.tunicalabsmedia.tk/logo.png" />
				<meta property="og:locale" content="en_GB" />
				<meta name="referrer" content="origin" />
				<link rel="canonical" href="https://www.tunicalabsmedia.tk/" />
				<link rel="icon" href="/logo.png" type="image/icon type" />
			</Head>
			<div className={styles.container}>

				{/* Include the Sidebar */}
				<Sidebar />
				<form className={styles.mainbar} onSubmit={handleSubmit}>
					<div className={styles.titlestudent}>Add Student</div>
					{/* Input Fields */}
					<div className={styles.inputs}>
						<div>Full Name</div>
						<input
							type="text"
							placeholder="Name"
							name="name"
							id="name"
							onChange={handleChange}
							value={formData.name}
							required
						/>
					</div>
					<div className={styles.inputs}>
						<div>Date Of Birth</div>
						<input
							type="date"
							name="dob"
							id="dob"
							onChange={handleChange}
							value={formData.dob}
							required
						/>
					</div>
					<div className={styles.inputs}>
						<div>School</div>
						<SelectData options={schools}
							initial="Select"
							name="school"
							id="school"
							onChange={handleChange}
							value={formData.school}
						/>
					</div>
					<div className={styles.inputs}>
						<div>Class</div>
						<SelectData
							options={terms}
							initial="Select"
							name="class"
							id="class"
							onChange={handleChange}
							value={formData.class}
						/>
					</div>
					<div className={styles.inputs}>
						<div>Division</div>
						<SelectData
							options={divisions}
							initial="Select"
							name="division"
							id="division"
							onChange={handleChange}
							value={formData.division}
						/>
					</div>
					<div className={styles.inputs}>
						<div>Status</div>
						<div className={styles.radios}>
							<div className={styles.options}>
								<input
									type="radio"
									value="Active"
									checked={formData.status === "Active"}
									id="Active"
									name="status"
									onChange={handleChange}
								/>
								<label htmlFor="html">Active</label>
							</div>
							<div className={styles.options}>
								<input
									type="radio"
									value="Invoice"
									checked={formData.status === "Invoice"}
									id="Invoice"
									name="status"
									onChange={handleChange}
								/>
								<label htmlFor="css">Invoice</label>
							</div>
						</div>
					</div>

					{/* Save Student Info */}
					<div className={styles.inputs}>
						<div></div>
						<input type="submit" value="Save" />
					</div>
				</form>
			</div>
		</main>
	)
}

export default Upload

// Checks whether an user is logged in or not
export async function getServerSideProps({ req, res }) {

	const cookies = new Cookies(req, res)

	console.log(cookies.get('identification'))

	if (cookies.get('identification') !== 'abir12345@hashed') {
		return {
			redirect:
			{
				destination: '/signin',
				permanent: false,
			},
		}
	}

	return {
		props: {}, // will be passed to the page component as props
	}

}
