"use client"
import React from "react";
import styles from "./NewProjectForm.module.scss";
import Dropzone from "./dropzone/Dropzone";
import { tech } from "./technologies";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();


function NewProjectForm() {
  return (
    <div className={styles.container}>
      <h1 className={styles.projectNameBack}>Pro<br/>ject</h1>
      <div className={styles.formContainer}>

        <div className={styles.title}>
          <h1>New Project</h1>
          <button>Back</button>
        </div>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <input
              type="text"
              name=""
              id="name"
              autoComplete="off"
              placeholder="Name"
            />
          </div>
          {/* description */}
          <div className={styles.formGroup}>
            <textarea
              type="text"
              name=""
              id="description"
              autoComplete="off"
              placeholder="Description"
            />
          </div>
          {/* technologies */}
          <div className={styles.formGroup}>
            
            <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            options={tech}
            isMulti
            isSearchable={true}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor:"var(--background-grey)",
                border:".3px solid var(--border-grey)",
                fontSize:"13px",
                fontWeight:"600",
                padding:"4px",
                borderRadius:"6px"
              }),
              menu: (baseStyles, state)=>({
                ...baseStyles,
                backgroundColor:"var(--background-text-grey)",
                fontSize:"13px",
                fontWeight:"700"
              }),
              multiValue:(baseStyles, state)=>({
                ...baseStyles,
                backgroundColor:"var(--border-grey)",
                color:"white",
                padding:"4px",
                borderRadius:"5rem"

                
              }),
              multiValueLabel:(baseStyles, state)=>({
                ...baseStyles,
                color:"white"
              }),
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: 'var(--green-color)',
                primary: 'black',
              },
            })}

          />  
          </div>
          {/* link */}
          <div className={styles.formGroup}>
            <input
              type="text"
              name=""
              id="link"
              autoComplete="off"
              placeholder="https://github.com/..."
            />
          </div>
          <div className={styles.formGroup}>
          <label htmlFor="select" className={styles.select}>Upload 2 Images Here</label>
          <p>The first image will be used as the cover photo the second will be used as the project display</p>
          <Dropzone />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.btnGroup}>
              <button type="submit">Publish</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProjectForm;
