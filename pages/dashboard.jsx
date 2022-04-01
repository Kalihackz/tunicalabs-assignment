import React from 'react'
import Head from 'next/head'
import SelectData from '../components/SelectData/SelectData'
import Sidebar from '../components/Sidebar/Sidebar'

import styles from '../styles/Dashboard.module.scss'

const Dashboard = () => {

	// Make a loading state variable array for holding loading status
	const [ loading, setLoading ] = React.useState(true)

	// Make a error state variable array for holding error status
	const [ error, setError ] = React.useState(false)

	// Make a tableData state variable array for holding table data
	const [ tableData, setTableData ] = React.useState( [] );

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
		
		// Fetch Table Data
		fetch(`/api/v1/students`)
		.then( res => res.json() )
		.then( data => {
			setLoading( false )
			return setTableData( data.data )
		} )
		.catch( error => { 
			setLoading( false )
			setError( true )
			console.error("Can't fetch data from server")
		})

		// Fetch School Data
		fetchSelectOptions( `/api/v1/schools`, setSchools )

		// Fetch Class Data
		fetchSelectOptions( `/api/v1/classes`, setTerms )

		// Fetch Division Data
		fetchSelectOptions( `/api/v1/divisions`, setDivisions )	

	}, [])

	// Generate the tableData elements to display within the table
	const tableElements = tableData.map( ( value ) => {

		return (
			<tr key={`${value.idv}`}>
				<td>{`${value.idv}`}</td>
				<td>{value.name}</td>
				<td>{`${value.age}`}</td>
				<td>{value.school}</td>
				<td>{`${value.class}`}</td>
				<td>{value.division}</td>
				<td>{value.status}</td>
				<td className={styles.function}>Edit</td>
				<td className={styles.function}>Delete</td>
			</tr>
		)

	} )

	// Render the Dashboard UI
	return (
		<main className={styles.main}>
			<Head>
				<meta charSet="UTF-8" />
				<title>View Student | TunicaLabs Media</title>
				<meta name="description" content="View Students in TunicaLabs Media." />
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
					<div className={styles.titlestudent}>View Student</div>

					{/* Input Fields */}
					<div className={styles.datagrid}>
						<div>
							<input type="text" placeholder="Name"/>
						</div>
						<div>
							<input type="text" placeholder="Age"/>
						</div>
						<div>
							<SelectData options={schools} initial="School"/>
						</div>
						<div>
							<SelectData options={terms} initial="Class"/>
						</div>
						<div>
							<SelectData options={divisions} initial="Division"/>
						</div>
						<div>
							<input type="submit" value="Search"/>
						</div>
					</div>

					{/* Table Interface */}
					<div className={styles.table}>

						{/* Loading Data or not  */}
						{
							loading ?
							<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'50vh'}}>
								Loading . . . 
							</div>
							:
							<table className={styles.students}>
								<thead>
									<tr>
										<th>ID&apos;V</th>
										<th>Name</th>
										<th>Age</th>
										<th>School</th>
										<th>Class</th>
										<th>Division</th>
										<th>Status</th>
										<th></th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{tableElements}
								</tbody>
							</table>
						}

						{/* Error fetching data */}
						{
							error && <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'50vh'}}>
										Can&apos;t connect to server !
									 </div>
						}

						{/* Pagination */}
						<div className={styles.pagination}>
							<div className={styles.arrow}>&lt;</div>
							<div className={`${styles.page} ${styles.active}`}>1</div>
							<div className={styles.page}>2</div>
							<div className={styles.page}>3</div>
							<div className={styles.arrow}>&gt;</div>
						</div>

						{/* Download Button */}
						<div className={styles.download}>
							<input type="submit" value="Download Excel"/>
							<img src='/download.svg' alt="download" width="15px"/>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Dashboard
