"use client";
import { SpinnerDiamond } from 'spinners-react'

import { useSession } from "next-auth/react"

export const DashAuthProvider = ({ children }) => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/login')
        }
      })
  return session ? {children} :  <div className={styles.loader}>
  <SpinnerDiamond size={100} thickness={100} speed={100} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(74, 172, 57, 1)" />
</div>
};