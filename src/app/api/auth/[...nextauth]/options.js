import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../../models/User";
import GoogleOAuthUser from "../../../../../models/GoogleOAuthUser";
import GithubOAuthUser from "../../../../../models/GithubOAuthUser";
import { compare } from 'bcryptjs';
import { redirect } from "next/navigation";
import dbConnect from "../../../../../lib/dbConnect";
import { NextResponse } from "next/server";

export const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      // credentials: {
      //   username: { label: "Email", type: "email" },
      //   password: { label: "Password", type: "password" }
      // },
      async authorize(credentials, req) {
        await dbConnect()
        try {
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            NextResponse.json({message:"Invalid email or password"},{status:401});
          }

          const passwordMatch = await compare(credentials.password, user.password);

          if (!passwordMatch) {
            NextResponse.json({message:"Invalid email or password"},{status:401});
          }

          // return { id: user._id, name: user.name, email: user.email };
          return(user);
        } catch (error) {
          NextResponse.json({message:error},{status:500});
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ token, profile, account }) {
      switch (account.provider) {
        case "google":
        try{
          await dbConnect()
            const userExists = await GoogleOAuthUser.findOne({email: profile.email})
            if(!userExists){
              await GoogleOAuthUser.create({
                email: profile.email,
                name: profile.name,
                image: profile.picture,
                locale:profile.locale
              })
            }
            return(true);
          }catch(error){
            NextResponse.json(error,{status:500});
          }
          case "github":
          try{
            await dbConnect()
            const userExists = await GithubOAuthUser.findOne({email: profile.email})
            if(!userExists){
              await GithubOAuthUser.create({
                email: profile.email,
                name: profile.name,
                image: profile.avatar_url,
                type: profile.type,
                site_admin: profile.site_admin,
                company:profile.company,
                blog:profile.blog,
                location:profile.location,
                hireable:profile.hireable,
                bio:profile.bio,
                twitter_username:profile.twitter_username,
                public_repos: profile.public_repos,
                public_gists:profile.public_gists,
                total_private_repos:profile.total_private_repos,
                followers:profile.followers,
                following:profile.following,
              })
            }
            return(true);
          }catch(error){
            NextResponse.json(error,{status:500});
          }
          break;
          case "credentials":
          return(true);

        default:
          return false;
      }
    },
  },

}

export async function loginIsRequiredServer(){
  const session = await getServerSession(authConfig)
  if(!session) return redirect("/login")
}
