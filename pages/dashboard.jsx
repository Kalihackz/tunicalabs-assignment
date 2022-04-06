import React from 'react'
import Head from 'next/head'
import SelectData from '../components/SelectData/SelectData'
import Sidebar from '../components/Sidebar/Sidebar'
import Paginate from '../components/Paginate/Paginate'
import ExcelDownloader from '../components/ExcelDownloader/ExcelDownloader'
import Edit from '../components/UpdateData/UpdateData'
import Delete from '../components/DeleteData/DeleteData'
import Cookies from 'cookies'


import styles from '../styles/Dashboard.module.scss'

var currentPage = 1;

const Dashboard = () => {

	// Make a loading state variable array for holding loading status
	const [startPage, setStartPage] = React.useState(1)

	// Make a loading state variable array for holding loading status
	const [loading, setLoading] = React.useState(true)

	// Make a error state variable array for holding error status
	const [error, setError] = React.useState(false)

	// Make a tableData state variable array for holding table data
	const [tableData, setTableData] = React.useState([]);

	// Total Students Count
	const [count, setCount] = React.useState(0);

	// Make a schools state variable array for holding schools data
	const [schools, setSchools] = React.useState([]);

	// Make a terms state variable array for holding classes data
	const [terms, setTerms] = React.useState([]);

	// Make a divisions state variable array for holding divisions data
	const [divisions, setDivisions] = React.useState([]);
	
	// Checks if Edit Modal is open or not
	const [isUpdateOpen, setIsUpdateOpen] = React.useState(false);

	// Checks if Delete Modal is open or not
	const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);

	// Gets the row id that needs to be updated
	const [idRow, setIdRow] = React.useState(1)

	// CGets the row mongo db id that needs to be deleted
	const [idRowDel, setIdRowDel] = React.useState(1)

	// Performs Open operation of Update Modal
	const openUpdateModal = (event) => {
		setIdRow(event.target.id)
		setIsUpdateOpen(true);
	}

	// Performs Delete operation of Delete Modal
	const closeUpdateModal = () => {
		setIsUpdateOpen(false);
	}

	// Performs Open operation of Dekete Modal
	const openDeleteModal = (event) => {
		setIdRowDel(event.target.id)
		setIsDeleteOpen(true);
	}

	// Performs Close operation of Delete Modal
	const closeDeleteModal = () => {
		setIsDeleteOpen(false);
	}


	// Fetch function for Students Details
	function fetchStudentsData(currentPage) {

		fetch(`/api/v1/students?currentPage=${9 * (currentPage - 1)}`)
			.then(res => res.json())
			.then(data => {
				setLoading(false)
				if (data && data.success === 'true') {
					setCount(data.total)
					return setTableData(data.data)
				}
				return alert('Failed to Search')
			})
			.catch(error => {
				setLoading(false)
				setError(true)
				console.error("Can't fetch data from server")
			})

	}

	// Fetch function for Students Details based on Search Terms
	function fetchStudentsOnSearch(name, age, school, term, division) {

		fetch(`/api/v1/search?name=${name}&age=${age}&school=${school}&term=${term}&division=${division}`)
			.then(res => res.json())
			.then(data => {
				if (data && data.success === 'true') {
					setCount(data.total)
					return setTableData(data.data)
				}
				return alert('Failed to Search')
			})
			.catch(error => {
				setError(true)
				console.error("Can't fetch data from server")
			})

	}

	// Fetch function for Select Option Filtering
	function fetchSelectOptions(url, setCB) {

		fetch(url)
			.then(res => res.json())
			.then(data => {
				if (data && data.success === 'true') {
					return setCB(data.data)
				}
				return alert('Failed to fetch')
			})
			.catch(error => {
				console.error("Can't fetch data from server")
			})

	}

	// Fetch Data
	React.useEffect(() => {

		// Fetch Table Data
		fetchStudentsData(currentPage)

		// Fetch School Data
		fetchSelectOptions(`/api/v1/schools`, setSchools)

		// Fetch Class Data
		fetchSelectOptions(`/api/v1/classes`, setTerms)

		// Fetch Division Data
		fetchSelectOptions(`/api/v1/divisions`, setDivisions)

	}, [])


	// Search terms form data
	const [formData, setFormData] = React.useState(
		{
			name: "",
			age: "",
			school: "",
			term: "",
			division: "",
		}
	);

	// Handle search form data input
	function handleInput(event) {

		const { name, type, value, checked } = event.target;

		setFormData((prevFormData) => {

			return {
				...prevFormData,
				[name]: type === 'checkbox' ? checked : value
			};

		});

	}

	// Submit search term data
	function submitInput(event) {

		event.preventDefault();

		fetchStudentsOnSearch(formData.name, formData.age, formData.school, formData.term, formData.division)

	}

	// Onclick for Page wise fetching of student data
	function handleClick(event) {

		event.preventDefault();

		currentPage = parseInt(event.target.innerHTML)

		// Fetch Table Data
		fetchStudentsData(currentPage)

	}

	// Get previous part of pages
	function handlePrev(event) {

		event.preventDefault();

		if (startPage > 1) {
			setStartPage(startPage - 3)
		}

	}

	// Get next part of pages
	function handleNext(event) {

		event.preventDefault();

		var limit, range;

		if (count % 9 === 0) {

			limit = parseInt(count / 9)

		} else {

			limit = (parseInt(count / 9)) + 1

		}

		if (limit % 3 === 0) {
			range = parseInt(limit / 3)
		} else {
			range = parseInt(limit / 3) + 1
		}

		if (startPage < range) {
			setStartPage(startPage + 3)
		}

	}


	// Generate the tableData elements to display within the table
	const tableElements = tableData.map((value) => {

		return (
			<tr key={`${value.idv}`}>
				<td>{`${value.idv}`}</td>
				<td>{value.name}</td>
				<td>{`${value.age}`}</td>
				<td>{value.school}</td>
				<td>{`${value.class}`}</td>
				<td>{value.division}</td>
				<td>{value.status}</td>
				<td className={styles.function} id={value.idv} onClick={openUpdateModal}>Edit</td>
				<td className={styles.function} id={value._id} onClick={openDeleteModal}>Delete</td>
			</tr>
		)

	})

	// Render the Dashboard UI
	return (
		<main className={styles.main}>
			<Head>
				<meta charSet="UTF-8" />
				<title>View Student | TunicaLabs Media</title>
				<meta name="description" content="View Students in TunicaLabs Media." />
				<meta property="og:site_name" content="TunicaLabs Media" />
				<meta property="og:url" content="https://www.tunicalabsmedia.tk/" />
				<meta property="og:image" content="https://www.tunicalabsmedia.tk/logo.png" />
				<meta property="og:locale" content="en_GB" />
				<meta name="referrer" content="origin" />
				<link rel="canonical" href="https://www.tunicalabsmedia.tk/" />
				<link rel="icon" href="/logo.png" type="image/icon type" />
			</Head>
			<Edit isUpdateOpen={isUpdateOpen} closeUpdateModal={closeUpdateModal} idRow={idRow} currentPage={currentPage} fetchStudentsData={fetchStudentsData} />
			<Delete isDeleteOpen={isDeleteOpen} closeDeleteModal={closeDeleteModal} idRowDel={idRowDel} currentPage={currentPage} fetchStudentsData={fetchStudentsData} />
			<div className={styles.container}>

				{/* Include the Sidebar */}
				<Sidebar />

				<div className={styles.mainbar}>
					<div className={styles.titlestudent}>View Student</div>

					{/* Input Fields */}
					<form className={styles.datagrid} onSubmit={submitInput}>
						<div>
							<input
								type="text"
								placeholder="Name"
								name="name"
								id="name"
								onChange={handleInput}
								value={formData.name}
							/>
						</div>
						<div>
							<input
								type="text"
								placeholder="Age"
								name="age"
								id="age"
								onChange={handleInput}
								value={formData.age}
							/>
						</div>
						<div>
							<SelectData options={schools}
								initial="School"
								name="school"
								id="school"
								onChange={handleInput}
								value={formData.school}
							/>
						</div>
						<div>
							<SelectData
								options={terms}
								initial="Class"
								name="term"
								id="term"
								onChange={handleInput}
								value={formData.term}
							/>
						</div>
						<div>
							<SelectData
								options={divisions}
								initial="Division"
								name="division"
								id="division"
								onChange={handleInput}
								value={formData.division}
							/>
						</div>
						<div>
							<input type="submit" value="Search" />
						</div>
					</form>

					{/* Table Interface */}
					<div className={styles.table}>

						{/* Loading Data or not  */}
						{
							loading ?
								<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
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
							error && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
								Can&apos;t connect to server !
									 </div>
						}

						{/* Pagination */}
						<Paginate
							handlePrev={handlePrev}
							handleClick={handleClick}
							handleNext={handleNext}
							startVal={startPage}
							activePage={currentPage}
						/>

						{/* Download Button */}
						<ExcelDownloader currentPage={currentPage} data={tableData} />
					</div>
				</div>
			</div>
		</main>
	)
}

export default Dashboard

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
