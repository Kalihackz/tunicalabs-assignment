import React from 'react'

import styles from '../../styles/UpdateData.module.scss'

// Receives the ID of the row that needs to be updated and performs updation
const UpdateData = ({ closeUpdateModal, isUpdateOpen, idRow, currentPage, fetchStudentsData }) => {

	var [formData, setFormData] = React.useState({});

	// Fetch the current row values and shows as initial values
	React.useEffect(() => {

		fetch(`/api/v1/student/${idRow}`)
			.then(res => res.json())
			.then(data => {
				if ( data && data.success === 'true' && data.data[0] ) {
					return setFormData(data.data[0])
				}
			})
			.catch(error => {
				console.error("Can't fetch data from server")
			})

	}, [idRow])

	// Update changes
	function handleChange(event) {

		const { name, value } = event.target;

		setFormData((prevFormData) => {

			return {
				...prevFormData,
				[name]: value
			};

		});

	}

	// Submit new changes
	function handleSubmit(event) {

		event.preventDefault();

		fetch('/api/v1/edit', {
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
					alert('Saved')
					fetchStudentsData(currentPage)
					return closeUpdateModal()
				}
				return alert('Not Saved')
			})

	}

	return (
		<div>
			{isUpdateOpen && (
				<>
					<div className={styles.overlay}></div>
					<div className={styles.modal}>
						<header className={styles.modal__header}>
							<h2>Edit Student Data</h2>
							<button onClick={closeUpdateModal} className={styles['close-button']}>&times;</button>
						</header>
						<form className={styles.modal__main} onSubmit={handleSubmit}>
								<input
									type="text"
									placeholder="Name"
									value={formData.name}
									id="name"
									name="name"
									onChange={handleChange}
								/>
								<input
									type="number"
									placeholder="Age"
									value={formData.age}
									id="age"
									name="age"
									onChange={handleChange}
								/>
								<input
									type="text"
									placeholder="School"
									value={formData.school}
									id="school"
									name="school"
									onChange={handleChange}
								/>
								<input
									type="text"
									placeholder="Class"
									value={formData.class}
									id="class"
									name="class"
									onChange={handleChange}
								/>
								<input
									type="text"
									placeholder="Division"
									value={formData.division}
									id="division"
									name="division"
									onChange={handleChange}
								/>
								<input
									type="text"
									placeholder="Status"
									value={formData.status}
									id="status"
									name="status"
									onChange={handleChange}
								/>
								<input className={styles.button} type="submit" />
						</form>
					</div>
				</>
			)}
		</div>
	)
}

export default UpdateData