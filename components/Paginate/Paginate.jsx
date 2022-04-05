import React from 'react'

import styles from '../../styles/Pagination.module.scss'

// Creates 3 buttons for pagination
const Paginate = ({ handlePrev, handleClick, handleNext, startVal, activePage }) => {

	return (
		<div className={styles.pagination}>
			<div className={styles.arrow} onClick={handlePrev}>&lt;</div>
			<div className={startVal === activePage ? `${styles.page} ${styles.active}` : styles.page} onClick={handleClick}>{startVal}</div>
			<div className={startVal + 1 === activePage ? `${styles.page} ${styles.active}` : styles.page} onClick={handleClick}>{startVal + 1}</div>
			<div className={startVal + 2 === activePage ? `${styles.page} ${styles.active}` : styles.page} onClick={handleClick}>{startVal + 2}</div>
			<div className={styles.arrow} onClick={handleNext}>&gt;</div>
		</div>
	)
}

export default Paginate
