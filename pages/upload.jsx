import React from 'react'
import Head from 'next/head'
import SelectData from '../components/SelectData/SelectData'
import Sidebar from '../components/Sidebar/Sidebar'

import styles from '../styles/Upload.module.scss'

const Upload = () => {

	// Make a schools state variable array for holding schools data
	const [ schools, setSchools ] = React.useState( [] );

	// Make a terms state variable array for holding classes data
	const [ terms, setTerms ] = React.useState( [] );

	// Make a divisions state variable array for holding divisions data
	const [ divisions, setDivisions ] = React.useState( [] );

	// Fetch function for Select Option Filtering
	function fetchSelectOptions( url, setCB ) {

		fetch( url )
		.then( res => res.json() )
		.then( data => {
			return setCB( data.data )
		} )
		.catch( error => { 
			console.error("Can't fetch data from server")
		})

	}

	// Fetch Data
	React.useEffect( () => {
		
		// Fetch School Data
		fetchSelectOptions( `/api/v1/schools`, setSchools )

		// Fetch Class Data
		fetchSelectOptions( `/api/v1/classes`, setTerms )

		// Fetch Division Data
		fetchSelectOptions( `/api/v1/divisions`, setDivisions )	

	}, [])

	// Render Upload UI
	return (
		<main className={styles.main}>
			<Head>
				<meta charSet="UTF-8" />
				<title>Add Student | TunicaLabs Media</title>
				<meta name="description" content="Add Student to TunicaLabs Media." />
				<meta property="og:site_name" content="TunicaLabs Media"/>
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

				<div className={styles.mainbar}>
					<div className={styles.titlestudent}>Add Student</div>

					{/* Input Fields */}
					<div className={styles.inputs}>
						<div>Full Name</div>
						<input type="text" placeholder="Name"/>
					</div>
					<div className={styles.inputs}>
						<div>Date Of Birth</div>
						<input type="date" name="" id=""/>
					</div>
					<div className={styles.inputs}>
						<div>School</div>
						<SelectData options={schools} initial="Select" />
					</div>
					<div className={styles.inputs}>
						<div>Class</div>
						<SelectData options={terms} initial="Select" />
					</div>
					<div className={styles.inputs}>
						<div>Division</div>
						<SelectData options={divisions} initial="Select" />
					</div>
					<div className={styles.inputs}>
						<div>Status</div>
						<div className={styles.radios}>
							<div className={styles.options}>
								<input type="radio" id="html" name="fav_language" value="HTML"/>
								<label htmlFor="html">Active</label>
							</div>
							<div className={styles.options}>
								<input type="radio" id="css" name="fav_language" value="CSS"/>
								<label htmlFor="css">Invoice</label>
							</div>
						</div>
					</div>

					{/* Save Student Info */}
					<div className={styles.inputs}>
						<div></div>
						<input type="submit" value="Save"/>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Upload
