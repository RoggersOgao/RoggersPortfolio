import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Suspense } from "react";
import styles from "../newProject/page.module.scss"
import { SpinnerCircular } from "spinners-react";
import { fetchProjectById } from "@/dashboardComponents/contexts/projectContext/projectActions";
import EditProjectForm from "@/dashboardComponents/projects/editProjectForm/EditProjectForm";

export default async function Page({params}){
    const session = await getServerSession(options)

    if(!session){
        redirect("/login")
    }
    const singleProject = await fetchProjectById(params.id)

    const projectData = singleProject.projects
    
    // console.log(projectData)

    return session ? (
        <div className={styles.container}>
            <div className={styles.project}>
            <Suspense fallback="loading...">
                <EditProjectForm projectData={projectData}/>
            </Suspense>
            </div>
        </div>

    ): <div className={styles.loader}>
        <SpinnerCircular size={100} thickness={100} speed={100} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(74, 172, 57, 1)" />
      </div>
}