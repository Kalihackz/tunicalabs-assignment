import React from 'react'
import { useRouter } from "next/router";

import styles from '../../styles/Header.module.scss'

import logo from '../../public/logo.svg'
import notification from '../../public/notification.svg'
import arrow from '../../public/arrow.png'

const Header = () => {

    // Get url path
    const { pathname } = useRouter();

    return (
        <header className={styles.header}>

            {
                pathname == "/upload" || pathname == "/dashboard" ? 
                <div className={styles.titleadmin}>
			        <img src={logo.src} alt="TunicaLabs Media"/>
                </div>
                :
                <div className={styles.title}>
			        <img src={logo.src} alt="TunicaLabs Media"/>
                </div>
            }

            {/* Render only when pathname is upload or dashboard */}
            { pathname == "/upload" || pathname == "/dashboard" ? 
                <div className={styles.admin}>
                    <img src={notification.src} alt="Notification" className={styles.notification} />
                    <span className={styles.badge}>99</span>
                    <div className={styles.avatar}>
                        <div className={styles['profile-btn']}>
                            <img title="Check Profile" className={styles['profile-btn__img']} src="/abir.png" alt="AG" />
                        </div>
                    </div>
                    <div className={styles.name}>Abir</div>
                    <img src={arrow.src} alt="arrow" className={styles.arrow}/>
                </div>
			 : 
				''  	
			}
        </header>
    )
}

export default Header