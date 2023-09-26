"use client"
import React, {useRef} from 'react'
import styles from './About.module.scss'
import Image from 'next/image'
import { useScroll, useTransform, motion} from "framer-motion"

function About() {

  const targetRef = useRef()
  const { scrollYProgress } = useScroll({
    target:targetRef,
    offset:["end end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0.4, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0.4, 1], [1, .8])

  return (
    <motion.div
    style={{scale, opacity}}
    ref={targetRef} className={styles.container} id="about">
    <Image
     src="/assets/group_162.png"
     alt="decoration img to separate hero section section and about me section"
     width={1336}
     height={100}
     className={styles.decoImg}
    />
        <div className={styles.about}>
            <motion.div
            style={{ opacity }}
            className={styles.aboutLeft}>
                <Image 
                    src="/assets/group_163.svg"
                    alt="green ai face svg"
                    width={550}
                    height={550}
                    className={styles.img}
                />
            </motion.div>
            <div className={styles.aboutRight}>
              <motion.div 
              style={{ opacity, scale }}
              className={styles.title}>
                <h1>About Me</h1>
              </motion.div>
              <motion.div
              style={{ opacity, scale }}
              className={styles.desc}>
                <p>I am a passionate and versatile professional with expertise in graphic design, web development, and system administration. With a solid background in the MERN stack, I am a full-stack developer capable of handling end-to-end web development projects. My skills extend beyond coding as I am also proficient in Linux administration, ensuring smooth operations and troubleshooting in various environments. Furthermore, I possess the ability to automate tasks using Python scripts and excel as a web scraping engineer. My talents also lie in cloud technologies, specifically OpenStack, where I excel at managing and troubleshooting virtual machines.</p>
              </motion.div>

              <Image 
              src="/assets/sphere1.svg"
              alt="sphere1"
              width={500}
              height={500}
              className={styles.img}
              />
            </div>
        </div>
    </motion.div>
  )
}

export default About