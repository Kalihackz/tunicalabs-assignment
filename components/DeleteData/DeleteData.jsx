import React from 'react'

import styles from '../../styles/DeleteData.module.scss'

const DeleteData = ({ closeDeleteModal, isDeleteOpen, idRowDel, currentPage, fetchStudentsData }) => {

	// Receives the ID of the row that needs to be deleted and performs deletion
	const Delete = (data) => (event) => {

		event.preventDefault();

		fetch('/api/v1/delete', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'multipart/form-data'
			},
			body: JSON.stringify({ _id: data })
		}
		)
			.then((resp) => resp.json())
			.then((data) => {
				if (data && data.success === 'true') {
					alert('Deleted')
					fetchStudentsData(currentPage)
					return closeDeleteModal()
				}
				return alert('Not Deleted')
			})

	}

	return (
		<div>
			{isDeleteOpen && (
				<>
					<div className={styles.overlay}></div>
					<div className={styles.modal}>
						<header className={styles.modal__header}>
							<h2>Delete Student Data</h2>
							<button onClick={closeDeleteModal} className={styles['close-button']}>&times;</button>
						</header>
						<main className={styles.modal__main}>
							<p>Are you sure that you want to delete ?</p>
							<button className={styles.yes}
								onClick={Delete(idRowDel)}
							>YES</button>
						</main>
					</div>
				</>
			)}
		</div>
	)
}

export default DeleteData