"use client"
import React, { useState } from 'react'
import styles from "./Portfolio.module.scss"
import Image from 'next/image'
import Link from 'next/link'

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Keyboard } from "swiper/modules";

function Portfolio() {

  const Plist = [
    {
      img: "/assets/portfolio.png",
      alt: "porfolio Img",
      link: "",
      type: ["web", "design"]
    },
    {
      img: "/assets/realEstateDesign.png",
      alt: "porfolio Img",
      link: "",
      type: ["web", "design"]
    },
    {
      img: "/assets/photography.png",
      alt: "porfolio Img",
      link: "",
      type: ["web", "design"]
    },
    {
      img: "/assets/intellisirnWebsite.png",
      alt: "porfolio Img",
      link: "",
      type: ["web", "design"]
    },
    {
      img: "/assets/blogUi.png",
      alt: "porfolio Img",
      link: "",
      type: ["web", "design"]
    },
    {
      img: "/assets/datingAppDesign.png",
      alt: "porfolio Img",
      link: "",
      type: ["web", "design"]
    },
    {
      img: "/assets/portfolio.png",
      alt: "porfolio Img",
      link: "",
      type: ["web", "design"]
    },
    {
      img: "/assets/portfolio.png",
      alt: "porfolio Img",
      link: "",
      type: ["web", "design"]
    },
    {
      img: "/assets/portfolio.png",
      alt: "porfolio Img",
      link: "",
      type: ["web", "design"]
    }
  ]
  const [selectedType, setSelectedType] = useState("web")
  const handleClick = (type) => {
    setSelectedType(type);
  };
  return (
    <div className={styles.container} id="portfolio">
      <div className={styles.portfolio}>
        <div className={styles.portfolioTitle}>
          <h1>Portfolio</h1>
        </div>
        <div className={styles.portfolioButtons}>
          <button
            onClick={() => handleClick('web')}
            className={selectedType === 'web' ? styles.selectedButton : ''}
          >
            Web
          </button>
          <button
            onClick={() => handleClick('design')}
            className={selectedType === 'design' ? styles.selectedButton : ''}
          >
            Design
          </button>
          <button
            onClick={() => handleClick('scripts')}
            className={selectedType === 'scripts' ? styles.selectedButton : ''}
          >
            Scripts
          </button>
        </div>
        <div className={styles.portfolioItems}>
          <>
            <Swiper
              slidesPerView={5}
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              keyboard={{
                enabled: true,
              }}
              breakpoints={{
                10: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                520: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1070: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1330: {
                  slidesPerView: 5,
                  spaceBetween: 20
                }
              }}
              modules={[Pagination, Keyboard]}
              className="mySwiper"
            >
              {Plist.filter((item) => item.type.includes(selectedType))
                .map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className={styles.cont} >
                      <div className={styles.imgCont}>
                        <Link href="">
                          <Image
                            src={item.img}
                            alt={item.alt}
                            width={100}
                            height={200}
                            quality={100}
                            className={styles.img}
                          />
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </>
        </div>
      </div>
    </div>
  )
}

export default Portfolio