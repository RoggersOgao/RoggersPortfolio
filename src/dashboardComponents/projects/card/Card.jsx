import React from 'react'
import styles from './Card.module.scss'
import Image from 'next/image'
import { GiCube } from 'react-icons/gi'
import { FaStickyNote } from 'react-icons/fa'
import { MdRebaseEdit } from 'react-icons/md'
import { AiFillDelete, AiOutlineSolution, AiFillCode, AiOutlineLink } from 'react-icons/ai'
import { GiTechnoHeart, GiBinoculars } from 'react-icons/gi'

function Card() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
          <div className={styles.cardTop}>
          <Image 
            src="/assets/photography.png"
            alt="project called Image photography"
            width={720}
            height={400}
            quality={100}
            className={styles.img}
          />
          </div>
          <div className={styles.cardBottom}>
          <div className={styles.titleArea}>
            <p className={styles.title}>Code Quest</p>
            <div className={styles.actions}>
              <i className={styles.edit}><MdRebaseEdit /></i>
              <i className={styles.delete}><AiFillDelete /></i>
            </div>
          </div>
            <div className={styles.dateGroup}>
            <p>Jan <span className={styles.year}>2023</span></p>
            <span className={styles.line}></span>
            </div>
          <div className={styles.projectBottomText}>
            <span className={styles.line}></span>
          <div className={styles.projectName}>
            <span><GiCube /></span>
            <h2>Photography Website</h2>
          </div>
          <div className={styles.projectOverview}>
            <span><GiTechnoHeart /></span>
            <p>Developed a brand identity and logo for a startup company operating in the sustainable fashion industry</p>
          </div>
          <div className={styles.techUsed}>
            <span><AiFillCode /></span>
            <p>React, MongoDb, Express js, Node js</p>
          </div>
          <div className={styles.projectLink}>
            <span><AiOutlineLink /></span>
            <p>https://github.com/RoggersOgao/Photography</p>
          </div>

          </div>
          </div>
      </div>
    </div>
  )
}

export default Card