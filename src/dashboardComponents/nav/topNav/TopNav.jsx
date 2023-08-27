import React from 'react'
import styles from "./TopNav.module.scss"
import Image from 'next/image'
// import { CiLogout } from "react-icons/ci"
function TopNav({ session }) {

    return (
        <div className={styles.container}>
            <div className={styles.nav}>
                <div className={styles.navLeft}>
                    <Image
                        src="/assets/logo.png"
                        alt="intellisirn logo"
                        width={80}
                        height={40}
                        className={styles.logo}
                    />
                </div>
                <div className={styles.navRight}>
                    <div className={styles.profile}>
                        <div className={styles.name}>
                            <p>Hello! {session.user.name}</p>
                        </div>
                        <div className={styles.image}>
                            <Image
                                src={session.user.image}
                                alt="profile Image"
                                width={60}
                                height={60}
                                className={styles.profile}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopNav