import SideNav from "@/dashboardComponents/nav/sideNav/SideNav";
import styles from "./page.module.scss"
import { redirect } from "next/navigation";
import { SpinnerCircular } from "spinners-react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Suspense } from "react";
import Project from "@/dashboardComponents/projects/Project";


export default async function Page(){
    const session = await getServerSession(options)
    if(!session){
        redirect("/login")
    }

    return session ? (
        <div className={styles.container}>
            <div className={styles.left}>
                {/* <SideNav /> */}
            </div>
            <div className={styles.right}>
            <Suspense fallback="loading...">
                <Project />
            </Suspense>
            </div>
        </div>
        ) : <div className={styles.loader}>
        <SpinnerCircular size={100} thickness={100} speed={100} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(74, 172, 57, 1)" />
      </div>
}