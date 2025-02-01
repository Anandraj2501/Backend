import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const user = new Schema({
    username:{
        type: String
    },
    email:{
        type: String,
        require: true
    },
    phone:{
        type: Number,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
});

user.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10); // Hash the password with a salt factor of 10
    next();
});

export const User = mongoose.model("user",user);