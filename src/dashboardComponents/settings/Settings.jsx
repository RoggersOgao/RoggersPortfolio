import React from "react";
import styles from "./Settings.module.scss";
import Link from "next/link";
import { FaGithub, FaHome, FaMapMarkedAlt } from "react-icons/fa";
import Image from "next/image";
import img1 from "../../../public/assets/abstract-colorful-splash-3d-background-generative-ai-background.jpg"
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoTwitter,
} from "react-icons/bi";
import Account from "./account/Account";

function Settings() {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.profileHeader}>
          {/* first row */}
          <div className={styles.profileHeaderRow1}>
            {/* <Link href="/dashboard/settings" className={styles.back}>
              <FaArrowLeft /> &nbsp; Back
            </Link> */}
            <div className={styles.avatCont}>
              <Image
                src={img1}
                alt=""
                width={600}
                height={600}
                className={styles.avatar}
                placeholder="blur"
              />

              <div className={styles.avatarText}>
                <p className={styles.name}>Roggers Ogao</p>
                <p className={styles.username}>roggersog@gmail.com</p>
              </div>
            </div>
          </div>

          {/* second row */}
          <div className={styles.row2}>
            <div className={styles.row2NameContainer}>
              <div className={styles.name}>Roggers Ogao</div>
              <div className={styles.type}>Admin</div>
              <div className={styles.hire}>roggersog@gmail.com</div>
            </div>
            <a
              href="https://github.com/RoggersOgao"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.row2Bio}>
                <FaGithub size={18} /> &nbsp;&nbsp;Profile
              </div>
            </a>

            {/* row 2 */}
            <div className={styles.row2InformationContainer}>
              <div className={styles.location}>
                <div className={styles.locationLeft}>
                  <p className={styles.locationHeading}>Location</p>
                  <p className={styles.locationText}>nairobi</p>
                </div>
                <div className={styles.locationRight}>
                  <FaMapMarkedAlt className={styles.icon} />
                </div>
              </div>
              <div className={styles.company}>
                <div className={styles.companyLeft}>
                  <p className={styles.companyHeading}>Company</p>
                  <div className={styles.companyText}>company</div>
                </div>
                <div className={styles.companyRight}>
                  <FaHome className={styles.icon} />
                </div>
              </div>
              <div className={styles.follow}>
                <p className={styles.followHeading}>Follow Me</p>
                <div className={styles.followText}>
                  <div className={styles.socialIcons}>
                    <i>
                      <BiLogoLinkedin />
                    </i>
                    <i>
                      <BiLogoTwitter />
                    </i>
                    <i>
                      <BiLogoFacebook />
                    </i>
                    <i>
                      <BiLogoInstagram />
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.accountSettings}>
        <div className={styles.accountSettingsTitle}>
          <h1>Account settings</h1>
        </div>
          <Account />
      </div>
    </div>
  );
}

export default Settings;
