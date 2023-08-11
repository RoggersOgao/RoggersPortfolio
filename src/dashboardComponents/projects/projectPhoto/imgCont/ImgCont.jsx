"use client"
import React,{useContext, useState} from 'react'
import { MdOutlineClose } from "react-icons/md";
import Image from "next/image";
import { BsGithub,BsInstagram } from 'react-icons/bs'
import { FiLinkedin } from 'react-icons/fi'
import ProjectPhoto from '../ProjectPhoto';
import styles from "./ImgCont.module.scss"
import ProjectContext from '@/dashboardComponents/contexts/projectContext/ProjectContext';
import { closeProjectPhoto } from '@/dashboardComponents/contexts/projectContext/dispatchActions';

function ImgCont() {
    const {state, dispatch} = useContext(ProjectContext)

    console.log(state)

  return (
    <>
    {state.isVisible && (
        <div className={styles.imgCont}>
        <div className={styles.closeBtn}
        onClick={()=> dispatch(closeProjectPhoto())}
        >
            <i><MdOutlineClose /></i>
        </div>
        <div className={styles.links}>
          <div className={styles.profile}>
          <div className={styles.profileImg}>
          <Image
                    src={"/assets/abstract-colorful-splash-3d-background-generative-ai-background.jpg"}
                    alt="abstract-colorful-splash-3d-background-generative-ai-background"
                    width={50}
                    height={50}
                    quality={100}
                    className={styles.img}
                />
          </div>
          <p>Follow</p>
          </div>
    
          <div className={styles.github}>
              <i><BsGithub /></i>
          </div>
          <div className={styles.instagram}>
            <i><BsInstagram /></i>
          </div>
          <div className={styles.linkedIn}>
              <i><FiLinkedin /></i>
          </div>
    
        </div>
          <div className={styles.imgProject}>
            <ProjectPhoto photo={state.projectPhoto} loading={state.isLoading}/>
          </div>
        </div>
    )}
    </>
  )
}

export default ImgCont