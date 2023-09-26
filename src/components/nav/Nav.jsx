"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Nav.module.scss";
import Image from "next/image";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { GiSkills, GiBookshelf, GiMailbox, GiDread } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { RiContactsLine } from "react-icons/ri";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  let handleMouseDown = (e) => {
    e.stopPropagation(); // Prevent event propagation to the parent div
  };

  useEffect(() => {
    const updateWindowWidth = () => {
      if (window.innerWidth > 900) {
        setIsMenuOpen(false);
      }
    };
    let handleMouseDown = (e) => {
      try {
        const menu = menuRef.current?.contains(e.target);
        if (!menu) {
          setIsMenuOpen(false);
        }
      } catch (err) {}
    };
    window.addEventListener("resize", updateWindowWidth);
    window.addEventListener("mousedown", handleMouseDown);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <div className={styles.navLeft}>
          <Image
            src="/assets/logo.png"
            alt="Intellisirn logo"
            width={65}
            height={30}
            quality={100}
            className={styles.img}
          />
        </div>
        <div className={styles.navRight}>
          <nav>
            <ul className={styles.list}>
              <li>
                <a className={styles.listItem} href="#home">
                  <FaHome className={styles.icon} />
                  Home
                </a>
              </li>
              <li>
                <a className={styles.listItem} href="#about">
                  <GiDread className={styles.icon} />
                  About Me
                </a>
              </li>
              <li>
                <a className={styles.listItem} href="#skills">
                  <GiSkills className={styles.icon} />
                  Skills
                </a>
              </li>
              <li>
                <a className={styles.listItem} href="#portfolio">
                  <GiBookshelf className={styles.icon} />
                  Portfolio
                </a>
              </li>
              <li>
                <a className={styles.listItem} href="#contact">
                  <GiMailbox className={styles.icon} />
                  Contact Me
                </a>
              </li>
            </ul>
          </nav>
          <div
            className={styles.humburger}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onMouseDown={handleMouseDown}
          >
            <CiMenuFries size={25} />
          </div>
          <div className={styles.phoneNavLinks}>
            {isMenuOpen && (
              <nav className={styles.phoneNav} ref={menuRef}>
                <ul className={styles.phoneList}>
                  <li>
                    <Link className={styles.phoneListItem} href="/">
                      <FaHome className={styles.icon} />
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.phoneListItem} href="#about">
                      <GiDread className={styles.icon} />
                      About Me
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.phoneListItem} href="#skills">
                      <GiSkills className={styles.icon} />
                      Skills
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.phoneListItem} href="#portfolio">
                      <GiBookshelf className={styles.icon} />
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.phoneListItem} href="#contact">
                      <GiMailbox className={styles.icon} />
                      Contact Me
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
