import React from 'react'
import styles from "./Hero.module.scss"
import Image from 'next/image'
import { BiLogoLinkedin, BiLogoGithub, BiLogoTwitter, BiLogoFacebook, BiLogoInstagram } from "react-icons/bi"
function Hero() {
    return (
        <div className={styles.container}>

            <div className={styles.sphere1}>
                <Image
                    src="/assets/sphere1.svg"
                    alt="sphere svg"
                    width={450}
                    height={450}
                    className={styles.img}
                />
            </div>
            <div className={styles.sphere3}>
                <Image
                    src="/assets/sphere3.svg"
                    alt="neon svg"
                    width={180}
                    height={180}
                    className={styles.img}
                />
            </div>
            <div className={styles.neon}>
                <Image
                    src="/assets/neon.svg"
                    alt="neon svg"
                    width={48}
                    height={48}
                    className={styles.img}
                />
            </div>
            <div className={styles.neon1}>
                <Image
                    src="/assets/neon.svg"
                    alt="neon svg"
                    width={48}
                    height={48}
                    className={styles.img}
                />
            </div>
            <div className={styles.socialIcons}>
                <i><BiLogoLinkedin /></i>
                <i><BiLogoGithub /></i>
                <i><BiLogoTwitter /></i>
                <i><BiLogoFacebook /></i>
                <i><BiLogoInstagram /></i>
            </div>
            <div className={styles.hero} id="home">
                <h1 className={styles.heroText}>Exp<br />ert</h1>
                <div className={styles.heroLeft}>
                    <p>Hola,<br />
                        amigos! <span>Roggers</span>, <br />
                        the design and code dynamo.</p>
                </div>
                <div className={styles.heroRight}>
                    <span className={styles.lineRight}></span>
                    <div className={styles.heroRightText}>
                        <h1 className={styles.text}> Hello <br /> I am <br /> Roggers</h1>
                        <p className={styles.moreInfo}>Design<br />Maverick<br /> <span>Extraordinaire</span></p>
                    </div>
                </div>
            </div>

            <div className={styles.sphere2}>
                <Image
                    src="/assets/sphere2.svg"
                    alt="sphere svg"
                    width={850}
                    height={850}
                    className={styles.img}
                />
            </div>
            <div className={styles.bottomGrad}>

            </div>
        </div>
    )
}

export default Hero