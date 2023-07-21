"use client"
import React from 'react'
import styles from "./Nav.module.scss"
import { useSession} from "next-auth/react"
import redirect from 'next/navigation'
import TopNav from './topNav/TopNav'
function Nav() {
    const { data: session } = useSession()
    return session ? (
        <div className={styles.container}>
            <TopNav session={session}  />
        </div>
    ): null
}

export default Nav