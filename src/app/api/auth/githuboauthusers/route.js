import dbConnect from "../../../../../lib/dbConnect";
import GithubOAuthUser from "../../../../../models/GithubOAuthUser"
import { NextResponse } from "next/server";


export async function GET(request) {
    await dbConnect()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    let user;
    try {
        if (id) {
            user = await GithubOAuthUser.findById(id)
            if (!user) {
                return NextResponse.json({ message: "product not found 💩" }, { status: 404 })
            }
        } else {
            user = await GithubOAuthUser.find()
            return NextResponse.json({ user }, { status: 200 })
        }
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 })
    }
}
export async function DELETE(request) {
    await dbConnect()
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        const user = await GithubOAuthUser.findByIdAndDelete(id)
        if (!user) {
            return NextResponse.json({ message: "product not found 💩" }, { status: 404 })
        } else {
            return NextResponse.json({ message: "User deleted successfully 👽" }, { status: 200 })
        }

    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 })
    }
}