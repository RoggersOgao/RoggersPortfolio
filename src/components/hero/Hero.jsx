"use client";
import React, { useRef } from "react";
import styles from "./Hero.module.scss";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import {
  BiLogoLinkedin,
  BiLogoGithub,
  BiLogoTwitter,
  BiLogoFacebook,
  BiLogoInstagram,
} from "react-icons/bi";
import { motion, useScroll, useTransform } from "framer-motion";

function Hero() {
  const targetRef = useRef();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.9], [1, 0.8]);
  const words = [
    "the design and code dynamo.",
    "Developing software with real-time adaptability.",
    "Creating flexible software through design and coding.",
    "Crafting software that can evolve on the fly.",
    "Designing and coding for dynamic behavior.",
    "Building software that responds to changing requirements.",
    "Writing code that can adjust to evolving conditions.",
    "Designing and coding with agility in mind.",
  ];
  const ffword = [
    "Extraordinaire",
    "Paragon of Excellence",
    "Virtuoso of Innovation",
    "Maestro of Aesthetics",
    "rodigy of Creative Mastery",
    "Genius of Artistry",
    "Luminary of Design Craftsmanship",
    "Connoisseur of Creative Brilliance",
  ];
  return (
    <motion.div
      style={{ opacity, scale }}
      className={styles.container}
      ref={targetRef}
    >
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
        <a
          href="https://www.linkedin.com/in/roggers-ogao-b35718202/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i>
            <BiLogoLinkedin />
          </i>
        </a>
        <a
          href="https://github.com/RoggersOgao"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i>
            <BiLogoGithub />
          </i>
        </a>
        <a
          href="https://twitter.com/RoggersOgao"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i>
            <BiLogoTwitter />
          </i>
        </a>
        <a
          href="https://facebook.com/RoggersOgao"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i>
            <BiLogoFacebook />
          </i>
        </a>

        <a
          href="https://www.instagram.com/roggers_ogao/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i>
            <BiLogoInstagram />
          </i>
        </a>
      </div>
      <div className={styles.hero} id="home">
        <h1 className={styles.heroText}>
          Exp
          <br />
          ert
        </h1>
        <div className={styles.heroLeft}>
          <motion.p
            initial={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.3,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
          >
            Hola,
            <br />
            amigos! <span className={styles.name}>Roggers</span>, <br />
            <Typewriter
              words={words}
              cursor
              cursorStyle="|"
              loop={false}
              delaySpeed={6000}
              className={styles.typedWord}
            />
          </motion.p>
        </div>
        <div className={styles.heroRight}>
          <span className={styles.lineRight}></span>
          <div className={styles.heroRightText}>
            <motion.h1
              initial={{
                opacity: 0,
                x: -20,
              }}
              transition={{
                duration: 0.3,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              className={styles.text}
            >
              {" "}
              Hello <br /> I am <br /> Roggers
            </motion.h1>
            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              transition={{
                duration: 0.3,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              className={styles.moreInfo}
            >
              Design
              <br />
              Maverick
              <br />
              <Typewriter
                words={ffword}
                cursor
                cursorStyle="|"
                loop={false}
                delaySpeed={6000}
                className={styles.typedWord}
              />
            </motion.p>
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
      <div className={styles.bottomGrad}></div>
    </motion.div>
  );
}

export default Hero;
