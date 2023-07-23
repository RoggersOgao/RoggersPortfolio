import React from 'react'
import styles from "./NewProjectForm.module.scss"
import Dropzone from './dropzone/Dropzone'


function NewProjectForm() {
  
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Dropzone />
      </div>
    </div>
  )
}

export default NewProjectForm