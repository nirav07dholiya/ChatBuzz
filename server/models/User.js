const mongoose = require("mongoose");
const { genSalt, hash, compare } = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required."]
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    color: {
        type: Number,
        required: false,
    },
    profileSetup: {
        type: Boolean,
        default: false,
    },
});

userSchema.pre("save", async function (next) {
    const user = this;
    if(!user.isModified('password')) return next();

    const salt =await genSalt(10);
    user.password =await hash(user.password, parseInt(salt));
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;