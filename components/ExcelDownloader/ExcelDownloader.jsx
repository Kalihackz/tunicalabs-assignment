import React from 'react'
import exportFromJSON from 'export-from-json'

import styles from '../../styles/ExcelDownload.module.scss'

const ExcelDownloader = (props) => {

	// Receives the data , filename and excel export format and exports in form of csv
	const ExportToExcel = (data, fileName, exportType) => (event) => {

		event.preventDefault();

		exportFromJSON({ data, fileName, exportType })

	}

	return (
		<div className={styles.download}>
			<button
				className={styles.excel}
				onClick={ExportToExcel(props.data, `students-${props.currentPage}`, 'csv')}
			>
				Download Excel
			</button>
			<img src='/download.svg' alt="download" width="15px" />
		</div>
	)
}

export default ExcelDownloader
