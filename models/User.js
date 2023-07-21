import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 60,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: /^\S+@\S+\.\S+$/,
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 100
    },
    image: {
        type: String,
        default: "https://source.unsplash.com/3tYZjGSBwbk"
    }
}, { timestamps: true }
)

const User = mongoose.models.User || mongoose.model("User", UserSchema)
module.exports = User