import { getServerSession } from "next-auth"; //using server session
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Suspense } from "react";
import styles from "../new_design/page.module.scss"
import { SpinnerCircular } from "spinners-react";
import { fetchDesignById } from "@/dashboardComponents/contexts/designContext/designActions";
import EditDesign from "@/dashboardComponents/design/editDesign/EditDesign";

export default async function Page({params}){
    const session = await getServerSession(options)

    if(!session){
        redirect("/login")
    }
    const singleDesign = await fetchDesignById(params.id)

    const designData = singleDesign.designs
    
    // console.log(designData)

    return session ? (
        <div className={styles.container}>
            <div className={styles.project}>
            <Suspense fallback="loading...">
                <EditDesign designData={designData}/>
            </Suspense>
            </div>
        </div>

    ): <div className={styles.loader}>
        <SpinnerCircular size={100} thickness={100} speed={100} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(74, 172, 57, 1)" />
      </div>
}