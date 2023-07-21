// "use client"
// import { useSession } from "next-auth/react"
// import { redirect } from "next/navigation"
// import styles from "./page.module.scss"
// import { SpinnerDiamond } from 'spinners-react'
// import SideNav from "@/dashboardComponents/nav/sideNav/SideNav"
// import Home from "@/dashboardComponents/home/Home"


// export default function Page() {
//   const { data: session } = useSession({
//     required: true,
//     onUnauthenticated() {
//       redirect('/login')
//     }
//   })


//   return session ? (<div>
//     <div className={styles.container}>
//       <div className={styles.left}>
//         <SideNav />
//       </div>
//       <div className={styles.right}>
//         <Home />
//       </div>
//     </div>

//   </div>) : <div className={styles.loader}>
//     <SpinnerDiamond size={100} thickness={100} speed={100} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(74, 172, 57, 1)" />
//   </div>;
// }

// the code above is for getting client session



// The code below is for getting session for a server component
import SideNav from "@/dashboardComponents/nav/sideNav/SideNav"
import Home from "@/dashboardComponents/home/Home"
import styles from "./page.module.scss"
import { redirect } from "next/navigation"
import { SpinnerDiamond } from 'spinners-react'
import { getServerSession } from "next-auth/next"
import { options } from "@/app/api/auth/[...nextauth]/options"
import { fetchGithubUsers, fetchGoogleUsers, fetchUser } from "@/dashboardComponents/contexts/dashHomeContext/DashActions"

export default async function Page() {
  const session = await getServerSession(options)
  // Function to count users for a specific year
  if(!session){
   redirect("/login")
  }
  const crUsers =  fetchUser();
  const gbUsers =  fetchGithubUsers();
  const ggUsers =  fetchGoogleUsers();

  const [users, gguser, gbuser] = await Promise.all([crUsers, ggUsers, gbUsers])
  // console.log(users)
  // console.log(gguser)
  // console.log(gbuser)

  const combinedUsers = [...users.users, ...gguser.user, ...gbuser.user]
  const numGoogleUsers = [...gguser.user].length
  const numGithubUsers = [...gbuser.user].length

  return session ? (<div>
      <div className={styles.container}>
        <div className={styles.left}>
          <SideNav />
        </div>
        <div className={styles.right}>
          <Home combinedUsers={combinedUsers} numGoogleUsers={numGoogleUsers} numGithubUsers={numGithubUsers}/>
        </div>
      </div>
  
    </div>) : <div className={styles.loader}>
      <SpinnerDiamond size={100} thickness={100} speed={100} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(74, 172, 57, 1)" />
    </div>;
}