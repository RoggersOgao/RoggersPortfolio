import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../../models/User";
import GoogleOAuthUser from "../../../../../models/GoogleOAuthUser";
import GithubOAuthUser from "../../../../../models/GithubOAuthUser";
import CredentialsOAuthUser from "../../../../../models/CredentialsOAuthUser";
import { compare } from 'bcryptjs';
import { redirect } from "next/navigation";
import dbConnect from "../../../../../lib/dbConnect";
import { NextResponse } from "next/server";

export const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        await dbConnect();
        try {
          const user = await CredentialsOAuthUser.findOne({ email: credentials.email });
      
          if (!user) {
            throw new Error("Invalid email or password");
          } else {
            const passwordMatch = await compare(credentials.password, user.password);
            if (!passwordMatch) {
              throw new Error("Invalid email or password");
            } else {
              return user;
            }
          }
        } catch (error) {
          throw error; // Re-throw the error to be caught by the error handler
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
  session: {
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 24 * 60 * 60, // 24 hours
    strategy: "jwt",
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    }
  },
  callbacks: {
    
      async session ({ session }) {
        
                try {
                  if (session?.user?.email) {
                    const user = await User.findOne({ email: session?.user.email });
                    const { _id, name, email, password, image, socials, personalInfo, role } = user
                    session.user = {_id, name, email, image, socials, personalInfo, role}
                  }
                  return Promise.resolve(session);
                } catch (error) {
                  console.log("callbacks error", error);
                }
            },
            async signIn({ profile, account, user }) {
              switch (account.provider) {
                case "google":
                  try {
                    await dbConnect();
                    const userExists = await GoogleOAuthUser.findOne({ email: profile.email });
                    if (!userExists) {
                      await GoogleOAuthUser.create({
                        email: profile.email,
                        name: profile.name,
                        image: profile.picture,
                        locale: profile.locale,
                        role: "user",
                      });
                    }
                  } catch (error) {
                    return NextResponse.json(error, { status: 500 });
                  }
                  const gguser = await User.findOne({ email: profile.email });
                  try {
                    if (gguser) {
                      const updatedUserData = {
                        ...gguser.toObject(),
                          name: profile.name,
                          email: profile.email,
                          image: profile.picture,
                          role: "user",
                      };
                     const updateOperation = { $set: updatedUserData };

            
                    const updUser = await User.findOneAndUpdate(
                        { email: profile.email },
                        updateOperation,
                        { new: true, runValidators: true }
                      );

                      return updUser;
                    } else {
                      const newUser = {
                        name: profile.name,
                        email: profile.email,
                        image: profile.picture,
                        role: "user",
                      };
            
                      await User.create(newUser);
                    }
                  } catch (err) {
                    return NextResponse.json(err.message, { status: 500 });
                  }
                  return true;
            
                case "github":
                  try {
                    await dbConnect();
                    const userExists = await GithubOAuthUser.findOne({ email: profile.email });
                    if (!userExists) {
                      await GithubOAuthUser.create({
                        email: profile.email,
                        name: profile.name,
                        image: profile.avatar_url,
                        type: profile.type,
                        site_admin: profile.site_admin,
                        company: profile.company,
                        blog: profile.blog,
                        location: profile.location,
                        hireable: profile.hireable,
                        bio: profile.bio,
                        twitter_username: profile.twitter_username,
                        public_repos: profile.public_repos,
                        public_gists: profile.public_gists,
                        total_private_repos: profile.total_private_repos,
                        followers: profile.followers,
                        following: profile.following,
                        role: "user",
                      });
                    }
                  } catch (error) {
                    return NextResponse.json(error, { status: 500 });
                  }
                  const gbuser = await User.findOne({ email: profile.email });
                  console.log(gbuser)
                  try {
                    if (gbuser) {
                      const updatedUserData = {
                        ...gbuser.toObject(),
                          name: profile.name,
                          email: profile.email,
                          image: profile.avatar_url,
                          socials: [
                            {
                              ...gbuser.socials[0].toObject(),
                              twitter: profile.twitter_username == "null" ? "" : `https://twitter.com/${profile.twitter_username}`,
                            },
                          ],
                          personalInfo: [
                            {
                              ...gbuser.personalInfo[0].toObject(),
                              location: profile.location,
                              company: profile.company,
                              bio: profile.bio == "null" ? "" : profile.bio,
                            },
                          ],
                          role: "user",
                      };

                      // Create a $set update operation to update only the specified fields
                      const updateOperation = { $set: updatedUserData };
                      const updatedUser = await User.findOneAndUpdate(
                        { email: profile.email },
                        updateOperation,
                        { new: true, runValidators: true }
                      );

                      // return the updated user
                      return updatedUser;

                    } else {
                      const newUser = {
                        name: profile.name,
                        email: profile.email,
                        image: profile.avatar_url,
                        socials: [
                          {
                            twitter: `https://twitter.com/${profile.twitter_username}`,
                          },
                        ],
                        personalInfo: [
                          {
                            location: profile.location,
                            company: profile.company,
                            bio: profile.bio,
                          },
                        ],
                        role: "user",
                      };
                      await User.create(newUser);
                      return true;
                    }
                  } catch (err) {
                    return NextResponse.json(err.message, { status: 500 });
                  }
            
                case "credentials":
                  await dbConnect();
                  const cruser = await User.findOne({ email: user.email });

                  // console.log(user)
                  try{
                    if(cruser){
                      const updatedUserData = {
                        ...cruser.toObject(),
                        name: user.name,  // Include other fields you want to update
                        email: user.email,
                        image: user.image,
                        socials: user.socials,
                        personalInfo: user.personalInfo,
                        role: user.role,
                      };
                    
                      // Create a $set update operation to update only the specified fields
                      const updateOperation = { $set: updatedUserData };
                      await User.findOneAndUpdate(
                        { email: user.email }, // Filter by email
                        updateOperation,
                        { new: true, runValidators: true }
                      );
                    }
                   return true;
                  }catch(err){
                    return NextResponse.json(err.message, { status: 500 });
                  }
            
                default:
                  return false;
              }
            }
            
  },

}

export async function loginIsRequiredServer(){
  const session = await getServerSession(authConfig)
  if(!session) return redirect("/login")
}
