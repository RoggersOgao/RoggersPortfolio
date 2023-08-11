"use client"
export const dsAddProject = (item) => {
    return {
      type: "ADD_PROJECT",
      payload: item,
    };
  };
  export const dsFetchProject = (item) => {
    return {
      type: "FETCH_PROJECT",
      payload: item,
    };
  };
  
  export const toogleProjectPhoto = () => {
    return {
      type: "IS_VISIBLE"
    };
  };
  export const closeProjectPhoto = () => {
    return {
      type:"IS_NOT_VISIBLE"
    }
  }
   
 
  export const addProjectPhoto = (item) => {
    return {
      type:"ADD_PROJECT_PHOTO",
      payload:item
    }
  }
  
  export const dsUpdateProject = (item) => {
    return {
      type: "UPDATE_PROJECT",
      payload: item,
    };
  };
  export const dsRemoveProject = (itemId) => {
    return {
      type: "REMOVE_PROJECT",
      payload: item,
    };
  };
  export const dsClearProject = () => {
    return {
      type: "CLEAR_PROJECT",
    };
  };