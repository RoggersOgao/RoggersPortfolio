"use client"
import React from "react";
import styles from "./Card.module.scss";
import Image from "next/image";
import { GiCube } from "react-icons/gi";
import { FaStickyNote } from "react-icons/fa";
import { MdRebaseEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import {
  AiFillDelete,
  AiOutlineSolution,
  AiFillCode,
  AiOutlineLink,
} from "react-icons/ai";
import { GiTechnoHeart, GiBinoculars } from "react-icons/gi";
import Link from "next/link";
import { deleteProject } from "@/dashboardComponents/contexts/projectContext/projectActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Card({ project }) {
  const coverPhoto = project.coverPhoto.map((item) => item.secure_url);
  const coverPhotoPublicId = project.coverPhoto.map((item) => item.public_id);
  const projectPhoto = project.projectPhoto.map((item) => item.secure_url);
  const projectPhotoPublicId = project.projectPhoto.map(
    (item) => item.public_id
  );
  // console.log(project._id);
  // console.log(coverPhotoPublicId[0])
  // console.log(projectPhoto)
  // console.log(projectPhotoPublicId[0])
  const router = useRouter();

  const handleDelete = async (id, coverId, projectId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (userConfirmed) {
      try {
        await deleteProject(id, coverId, projectId);

        toast.success("Project deleted successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        router.refresh(); // Adapt this based on your routing setup
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while deleting the project", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <Image
            src={coverPhoto[0]}
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
              <Link href={`/dashboard/projects/${project._id}`}>
                <i className={styles.edit}>
                  <MdRebaseEdit />
                </i>
              </Link>
              {/**/}
              <i
                className={styles.delete}
                onClick={() =>
                  handleDelete(
                    project._id,
                    coverPhotoPublicId[0],
                    projectPhotoPublicId[0]
                  )
                }
              >
                <AiFillDelete />
              </i>
            </div>
          </div>
          <div className={styles.dateGroup}>
            <p>
              Jan <span className={styles.year}>2023</span>
            </p>
            <span className={styles.line}></span>
          </div>
          <div className={styles.projectBottomText}>
            <span className={styles.line}></span>
            <div className={styles.projectName}>
              <span>
                <GiCube />
              </span>
              <h2>{project.projectName}</h2>
            </div>
            <div className={styles.projectOverview}>
              <span>
                <GiTechnoHeart />
              </span>
              <p>{project.projectDescription}</p>
            </div>
            <div className={styles.techUsed}>
              <span>
                <AiFillCode />
              </span>
              <div className={styles.technologies}>
                {project.technologies.map((item, index) => (
                  <p key={index}>
                    {item.label}{" "}
                    {index !== project.technologies.length - 1 && ","}
                  </p>
                ))}
              </div>
            </div>
            <div className={styles.projectLink}>
              <span>
                <AiOutlineLink />
              </span>
              <p>https://github.com/RoggersOgao/Photography</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
