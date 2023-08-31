import React, { useEffect, useState, useRef, useContext } from "react";
import styles from "./Profile.module.scss";
import { PiCaretUpDownBold } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import { VscError } from "react-icons/vsc";
import Image from "next/image";
import Dropzone from "./dropzone/Dropzone";
import SettingsContext from "@/dashboardComponents/contexts/settingsContext/SettingsContext";

function Profile() {
  const { state } = useContext(SettingsContext);
  const [roleDropdownActive, setRoleDropdownActive] = useState(false);
  const [activeRole, setActiveRole] = useState("user");
  const roleRef = useRef();
  const [form, setForm] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [files, setFiles] = useState([]);
  const [displayFiles, setDisplayFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const socialLinks = [
    { linkedIn: form.linkedIn || "" },
    { twitter: form.twitter || "" },
    { github: form.github || "" },
    { instagram: form.instagram || "" },
    { facebook: form.facebook || "" },
  ];

  const pProfile = [
    { location: form.location || "" },
    { company: form.company || "" },
    { bio: form.bio || "" },
  ];

  const formToBeUploadedData = {
    name: form.name || "",
    email: form.email || "",
    socials: socialLinks || [],
    personalInfo: pProfile || [],
    role: form.role || "",
  };

  // console.log(formToBeUploadedData);

  // handle click outside logic using useEffect
  useEffect(() => {
    const handleClickOutside = (e) => {
      const handler = roleRef.current && roleRef?.current?.contains(e.target);

      if (!handler) {
        setRoleDropdownActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // getting all the field name and properties using setField

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const validateField = (name, value) => {
    const errors = { ...formErrors };

    switch (name) {
      case "name":
        if (!value) {
          errors.name = "Name is required";
        } else if (value.length > 60) {
          errors.name = "Name cannot exceed 60 characters";
        } else {
          delete errors.name;
        }
        break;
      case "email":
        if (!value) {
          errors.email = "Email is required";
        } else if (!value.match(/^\S+@\S+\.\S+$/)) {
          errors.email = "Please enter a valid email address";
        } else {
          delete errors.email; // Clear the error if the field is valid
        }
        break;
      case "location":
        if (value.length > 60) {
          errors.location =
            "Location details should be less than 60 characters";
        } else {
          delete errors.location;
        }
        break;
      case "company":
        if (value.length > 60) {
          errors.company = "Company name should be less than 60 characters";
        } else {
          delete errors.company;
        }
        break;
      case "linkedIn":
      case "facebook":
      case "instagram":
      case "twitter":
      case "github":
        if (value.length > 0 && !isValidSocialMediaURL(value)) {
          errors[
            name
          ] = `Please provide a valid link, e.g. https://www.${name}.com/...`;
        } else {
          delete errors[name]; // Clear the error if the field is valid
        }
        break;

      case "bio":
        if (value.length > 600) {
          errors.bio = "Bio must be less 600 characters";
        } else {
          delete errors.bio; // Clear the error if the field is valid
        }
        break;
      default:
        break;
    }
    setFormErrors(errors);
  };

  const isValidSocialMediaURL = (url) => {
    const socialMediaPatterns = {
      linkedIn: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
      twitter: /^(https?:\/\/)?(www\.)?twitter\.com\/.*$/,
      github: /^(https?:\/\/)?(www\.)?github\.com\/.*$/,
      instagram: /^(https?:\/\/)?(www\.)?instagram\.com\/.*$/,
      facebook: /^(https?:\/\/)?(www\.)?facebook\.com\/.*$/,
    };
    for (const platform in socialMediaPatterns) {
      if (url.match(socialMediaPatterns[platform])) {
        return true;
      }
    }

    return false;
  };

  // updating the form field role

  const handleActiveRole = (name) => {
    setField("role", name);
  };

  // console.log(form);
  // console.log(formErrors);

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <form className={styles.profileForm}>
          <div className={styles.profileLeft}>
            <div className={styles.cont}>
              {/* full name */}
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name*</label>
                <input
                  type="text"
                  id="name"
                  placeholder="eg. Roggers Ogao"
                  style={{ border: formErrors.name ? ".3px solid red" : "" }}
                  autoComplete="off"
                  value={form?.name || ""}
                  onChange={(e) => {
                    setField("name", e.target.value),
                      validateField("name", e.target.value);
                  }}
                />
                <AnimatePresence>
                  {formErrors.name && (
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: 0.3 }} // Add a delay before exit animation
                    >
                      <VscError /> {formErrors.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              {/* email */}
              <div className={styles.formGroup}>
                <label htmlFor="email">Email*</label>
                <input
                  type="text"
                  id="email"
                  placeholder="eg. example@xyz.com"
                  autoComplete="off"
                  style={{ border: formErrors.email ? ".3px solid red" : "" }}
                  onChange={(e) => {
                    setField("email", e.target.value),
                      validateField("email", e.target.value);
                  }}
                  value={form?.email || ""}
                />
                <AnimatePresence>
                  {formErrors.email && (
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: 0.3 }} // Add a delay before exit animation
                    >
                      <VscError /> {formErrors.email}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              {/* location */}
              <div className={styles.formGroup}>
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  placeholder="eg. Nairobi"
                  id="location"
                  autoComplete="off"
                  value={form?.location || ""}
                  style={{
                    border: formErrors.location ? ".3px solid red" : "",
                  }}
                  onChange={(e) => {
                    setField("location", e.target.value),
                      validateField("location", e.target.value);
                  }}
                />
                <AnimatePresence>
                  {formErrors.location && (
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: 0.3 }} // Add a delay before exit animation
                    >
                      <VscError /> {formErrors.location}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              {/* company */}
              <div className={styles.formGroup}>
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  placeholder="eg. intellisirn"
                  id="company"
                  value={form?.company || ""}
                  autoComplete="off"
                  style={{ border: formErrors.company ? ".3px solid red" : "" }}
                  onChange={(e) => {
                    setField("company", e.target.value),
                      validateField("company", e.target.value);
                  }}
                />
                <AnimatePresence>
                  {formErrors.company && (
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: 0.3 }} // Add a delay before exit animation
                    >
                      <VscError /> {formErrors.company}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              {/* linkend in */}
              <div className={styles.formGroup}>
                <label htmlFor="linkedin">Linked In</label>
                <input
                  type="text"
                  placeholder="https://linkedin.com/..."
                  id="linkedin"
                  autoComplete="off"
                  value={form?.linkedIn || ""}
                  style={{
                    border: formErrors.linkedIn ? ".3px solid red" : "",
                  }}
                  onChange={(e) => {
                    setField("linkedIn", e.target.value),
                      validateField("linkedIn", e.target.value);
                  }}
                />
                <AnimatePresence>
                  {formErrors.linkedIn && (
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: 0.3 }} // Add a delay before exit animation
                    >
                      <VscError /> {formErrors.linkedIn}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              {/* twitter */}
              <div className={styles.formGroup}>
                <label htmlFor="twitter">Twitter</label>
                <input
                  type="text"
                  placeholder="https://twitter.com/..."
                  id="twitter"
                  autoComplete="off"
                  value={form?.twitter || ""}
                  style={{ border: formErrors.twitter ? ".3px solid red" : "" }}
                  onChange={(e) => {
                    setField("twitter", e.target.value),
                      validateField("twitter", e.target.value);
                  }}
                />
                <AnimatePresence>
                  {formErrors.twitter && (
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: 0.3 }} // Add a delay before exit animation
                    >
                      <VscError /> {formErrors.twitter}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              {/* instagram */}
              <div className={styles.formGroup}>
                <label htmlFor="instagram">Instagram</label>
                <input
                  type="text"
                  placeholder="https://instagram.com/..."
                  id="instagram"
                  autoComplete="off"
                  value={form?.instagram || ""}
                  style={{
                    border: formErrors.instagram ? ".3px solid red" : "",
                  }}
                  onChange={(e) => {
                    setField("instagram", e.target.value),
                      validateField("instagram", e.target.value);
                  }}
                />
                <AnimatePresence>
                  {formErrors.instagram && (
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: 0.3 }} // Add a delay before exit animation
                    >
                      <VscError /> {formErrors.instagram}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              {/* facebook */}
              <div className={styles.formGroup}>
                <label htmlFor="facebook">Facebook</label>
                <input
                  type="text"
                  placeholder="https://facebook.com/..."
                  id="facebook"
                  autoComplete="off"
                  value={form?.facebook || ""}
                  style={{
                    border: formErrors.facebook ? ".3px solid red" : "",
                  }}
                  onChange={(e) => {
                    setField("facebook", e.target.value),
                      validateField("facebook", e.target.value);
                  }}
                />
                <AnimatePresence>
                  {formErrors.facebook && (
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: 0.3 }} // Add a delay before exit animation
                    >
                      <VscError /> {formErrors.facebook}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              {/* github */}
              <div className={styles.formGroup}>
                <label htmlFor="github">github</label>
                <input
                  type="text"
                  placeholder="https://github.com/..."
                  id="github"
                  autoComplete="off"
                  value={form?.github || ""}
                  style={{ border: formErrors.github ? ".3px solid red" : "" }}
                  onChange={(e) => {
                    setField("github", e.target.value),
                      validateField("github", e.target.value);
                  }}
                />
                <AnimatePresence>
                  {formErrors.github && (
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: 0.3 }} // Add a delay before exit animation
                    >
                      <VscError /> {formErrors.github}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              {/* role */}

              <div className={styles.dropdownContainer} ref={roleRef}>
                <label htmlFor="role">Role</label>
                <div className={styles.dropdown}>
                  <button
                    htmlFor="role"
                    type="button"
                    onClick={() => {
                      setRoleDropdownActive(!roleDropdownActive);
                    }}
                  >
                    Role ({form?.role ? form?.role : "user"})
                    <PiCaretUpDownBold />
                  </button>
                  {roleDropdownActive && (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: 0.3 }}
                        className={styles.dropdownList}
                      >
                        <ul>
                          <motion.li
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.3 }} // Add a delay before exit animation
                            onClick={(e) => handleActiveRole("user")}
                          >
                            User
                          </motion.li>
                          <motion.li
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.3 }}
                            onClick={(e) => handleActiveRole("admin")}
                          >
                            Admin
                          </motion.li>
                        </ul>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              </div>
              {/* bio */}
              <div className={styles.formGroup}>
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  placeholder="write something short about yourself"
                  autoComplete="off"
                  value={form?.bio || ""}
                  style={{ border: formErrors.bio ? ".3px solid red" : "" }}
                  onChange={(e) => {
                    setField("bio", e.target.value),
                      validateField("bio", e.target.value);
                  }}
                />
                <AnimatePresence>
                  {formErrors.bio && (
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: 0.3 }} // Add a delay before exit animation
                    >
                      <VscError /> {formErrors.bio}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              {/* button */}
              <div className={styles.formGroup}>
                <div className={styles.button}>
                  <button type="submit">Publish</button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.profileRight}>
            <div className={styles.profileRightTitle}>
              <h1>Your photo</h1>
              <div className={styles.addButton}>
                <button type="button">Add New User</button>
              </div>
            </div>
            <div className={styles.profileAvatarContainer}>
              <div className={styles.profileAvatarContainerTop}>
                <div className={styles.profileAvatarContainerTopLeft}>
                  {state.file.map((item, index) => (
                    <div className={styles.imgCont} key={index}>
                      <Image
                        src="/assets/abstract-colorful-splash-3d-background-generative-ai-background.jpg"
                        alt="dafdfadfdafdfdasfadsf"
                        width={100}
                        height={100}
                        className={styles.avatar}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
                <div className={styles.profileAvatarContainerTopRight}>
                  <div className={styles.top}>
                    <h3>Edit your photo</h3>
                  </div>
                  <div className={styles.bottom}>
                    <div className={styles.button1}>
                      <button type="button">Update</button>
                    </div>
                    <div className={styles.button2}>
                      <button type="button">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.profileAvatarContainerBottom}>
                <Dropzone
                  files={files}
                  setFiles={setFiles}
                  displayFiles={displayFiles}
                  setDisplayFiles={setDisplayFiles}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
