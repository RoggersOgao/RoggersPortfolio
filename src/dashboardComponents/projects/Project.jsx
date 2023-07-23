import React from 'react'
import styles from "./Project.module.scss"
import Card from './card/Card'
import Link from 'next/link'

function Project() {
  return (
    <div className={styles.container}>
      <div className={styles.containerLeft}>
        <div className={styles.top}>
          <div className={styles.title}>
            <h1>Projects</h1>
          </div>
          <div className={styles.smTitle}>
            <h1>Projects</h1>
            <div className={styles.buttonCont}>
              <Link href="/dashboard/projects/newProject"><button>Add new Project</button></Link>
            </div>
            </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.card}>
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
      <div className={styles.containerRight}>
      <ul>
        <li>photography website</li>
      </ul>
      </div>
    </div>
  )
}

export default Project