import React from 'react'
import styles from "./Footer.module.scss"
import { BiLogoLinkedin, BiLogoGithub, BiLogoTwitter, BiLogoFacebook, BiLogoInstagram } from "react-icons/bi"
import { GiSkills, GiBookshelf, GiMailbox, GiDread } from 'react-icons/gi'
import { FaHome } from 'react-icons/fa'
import { RiContactsLine } from 'react-icons/ri'
import {SiMailchimp, SiTimescale} from 'react-icons/si'
import {BsPhoneFlip} from 'react-icons/bs'
import { FaBusinessTime } from 'react-icons/fa'
function Footer() {
  return (
    <div className={styles.container}>
      <footer className={styles.footer}>
          <div className={styles.footerLeft}>
            <div className={styles.footerLeftTitle}>
              <h1>Contact Info</h1>
            </div>
            <div className={styles.content}>
              <p><SiMailchimp />roggersog@gmail.com</p>
              <p><BsPhoneFlip />0700601885/0798217927</p>
            </div>
            <div className={styles.icons}>
                <i><BiLogoLinkedin /></i>
                <i><BiLogoGithub /></i>
                <i><BiLogoTwitter /></i>
                <i><BiLogoFacebook /></i>
                <i><BiLogoInstagram /></i>
            </div>
          </div>
          <div className={styles.footerMiddle}>
            <div className={styles.footerMiddleTitle}>
              <h1>Navigation</h1>
            </div>
            <div className={styles.content}>
              <p><a href="#home"><FaHome />Home </a></p>
              <p><a href="#about"><GiDread />About Me</a></p>
              <p><a href="#skills"><GiSkills />Skills</a></p>
              <p><a href="#portfolio"><GiBookshelf />Portfolio</a></p>
              <p><a href="#contact"><GiMailbox />Contact Me</a></p>
            </div>
          </div>
          <div className={styles.footerRight}>
          <div className={styles.footerMiddleTitle}>
              <h1>Accessibility</h1>
            </div>
            <div className={styles.content}>
              <p><FaBusinessTime />Available Monday - Friday</p>
              <p><SiTimescale />8:00 - 5:00</p>
            </div>
          </div>
      </footer>
    </div>


  )
}

export default Footer