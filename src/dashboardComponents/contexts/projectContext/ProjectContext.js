"use client"
import { createContext, useReducer } from "react";
import { ProjectReducer } from "./projectReducer";
const ProjectContext = createContext()

export const ProjectProvider = ({children}) => {
    const initialState ={
        projects:[],
        isVisible:false,
        isLoading:true
    }
    const [ state, dispatch] = useReducer(ProjectReducer, initialState)

    return <ProjectContext.Provider value={{
        state,
        dispatch,
        isLoading:state.isLoading
    }}>
        {children}
    </ProjectContext.Provider>
}
export default ProjectContext