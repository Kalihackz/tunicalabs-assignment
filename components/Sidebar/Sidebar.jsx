import React from 'react'
import Link from 'next/link'
import { useRouter } from "next/router"

import arrow from '../../public/arrowdark.png'
import Group from '../../icons/Group'
import Person from '../../icons/Person'

import styles from '../../styles/Sidebar.module.scss'

const Sidebar = () => {

	// Get the path from url
	const { pathname } = useRouter();

	return (
		<div className={styles.sidebar}>
			<div className={styles.employee}>
				<div className={styles.text}>Student</div>
				<div className={styles.arrow}>
					<img src={arrow.src} alt="arrow" className={styles.arrow} />
				</div>
			</div>
			<div className={styles.functions}>

				{/* Display different color of the Option based on active status */}
				{pathname == "/dashboard" ?
					<div className={`${styles.options} ${styles.active}`}>
						<Group />
						<Link href="/dashboard"><a>
							<div className={styles.text}>View Student</div>
						</a></Link>
					</div>
					:
					<div className={styles.options}>
						<Group />
						<Link href="/dashboard"><a>
							<div className={styles.text}>View Student</div>
						</a></Link>
					</div>
				}

				{/* Display different color of the Option based on active status */}
				{pathname == "/upload" ?
					<div className={`${styles.options} ${styles.active}`}>
						<Person />
						<Link href="/upload"><a>
							<div className={styles.text}>Add Student</div>
						</a></Link>
					</div>
					:
					<div className={styles.options}>
						<Person />
						<Link href="/upload"><a>
							<div className={styles.text}>Add Student</div>
						</a></Link>
					</div>
				}
			</div>
		</div>
	)
}

export default Sidebar
