"use client"
import React, { useRef } from 'react'
import styles from "./Skills.module.scss"
import Image from 'next/image'
import { motion, useScroll, useTransform} from "framer-motion"

function Skills() {

    const targetRef = useRef()
    const { scrollYProgress } = useScroll({
      target:targetRef,
      offset:["end end", "end start"]
    })
  
    const opacity = useTransform(scrollYProgress, [0, .5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, .4], [1, .8])
    const skills = [
        {
            skillImg: "/assets/group_180.svg",
            numImg: "/assets/group_179.svg",
            alt: "graphic design concept",
            title: "Graphic Design",
            description: "As a graphic designer, I bring creativity and innovation to every project. With my skills in Illustrator, XD, and Photoshop, I can transform ideas into visually stunning designs. Whether it&apos;s creating captivating logos, eye-catching illustrations, or engaging user interfaces, I strive to deliver exceptional designs that leave a lasting impression."
        },
        {
            skillImg: "/assets/group_185.svg",
            numImg: "/assets/group_184.svg",
            alt: "Web Development concept",
            title: "Web Development",
            description: "In the realm of web development, I am a proficient full-stack developer specializing in the MERN stack (MongoDB, Express.js, React.js, Node.js). From conceptualization to deployment, I handle the entire development process, ensuring seamless functionality and an intuitive user experience. I have a strong command of front-end technologies such as HTML, CSS, and JavaScript, which allows me to create responsive, mobile-friendly websites that adapt to various devices and screen sizes."
        },
        {
            skillImg: "/assets/undraw_folder_re_apfp.svg",
            numImg: "/assets/group_188.svg",
            alt: "System Administration concept",
            title: "System Administration",
            description: "With a solid foundation in system administration, particularly in Linux environments, I possess the skills to effectively manage and troubleshoot various systems. From server configuration to performance optimization, I ensure the smooth operation of IT infrastructure. Additionally, I am well-versed in scripting using Python, enabling me to automate repetitive tasks, streamline processes, and boost overall productivity."
        },
        {
            skillImg: "/assets/undraw_server_cluster_jwwq.svg",
            numImg: "/assets/group_195.svg",
            alt: "Cloud Technologies: concept",
            title: "Cloud Technologies:",
            description: "My expertise in cloud technologies, specifically OpenStack, allows me to harness the power of virtualization. I possess a deep understanding of managing and troubleshooting virtual machines, ensuring efficient resource allocation and optimal performance. With my knowledge of cloud architectures, I can help organizations leverage the benefits of scalability, reliability, and cost-efficiency offered by cloud platforms."
        }

    ]
    return (
        <motion.div
        
        variants = {{
            hidden:{ opacity:0},
            visible:{opacity:1}
        }}
        initial="hidden"
        whileInView="visible"
        transition={{
            duration:.5,
        }}
        style={{opacity, scale}}
        ref={targetRef}
     className={styles.container} id="skills">
            {/* skills section */}
            <Image
                src="/assets/sphere1.svg"
                alt="sphere svg"
                width={500}
                height={500}
                className={styles.img1}
            />
            <Image
                src="/assets/sphere2.svg"
                alt="sphere svg"
                width={930}
                height={930}
                className={styles.img2}
            />
            <Image
                src="/assets/sphere1.svg"
                alt="sphere svg"
                width={500}
                height={500}
                className={styles.img3}
            />
            <Image
                src="/assets/sphere1.svg"
                alt="sphere svg"
                width={500}
                height={500}
                className={styles.img4}
            />
            <div className={styles.skills}>
                <motion.div
                    initial={{
                        x: -20,
                        opacity: 0
                    }}
                    transition={{
                        duration: .3
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0
                    }}
                    className={styles.skillsTitle}>
                    <h1>Skills</h1>
                </motion.div>
                {skills.map((item, index) => (
                    <div
                    
                    className={styles.skillsCont} key={index}>
                        <div className={styles.skillsContLeft}>
                            <Image
                                src={item.skillImg}
                                alt={item.alt}
                                width={600}
                                height={600}
                                className={styles.graphicConceptImg}
                            />
                        </div>
                        <div className={styles.skillsContRight}>
                            <Image
                                src={item.numImg}
                                alt="number graphic"
                                width={300}
                                height={210}
                                className={styles.one}
                            />
                            <div className={styles.title}>
                                <h1>{item.title}</h1>
                            </div>
                            <div className={styles.description}>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </motion.div>
    )
}

export default Skills