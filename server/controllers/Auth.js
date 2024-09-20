const { sign } = require('jsonwebtoken');
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { renameSync, unlinkSync } = require('fs');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, id) => {
    return sign({ email, id }, process.env.JWT_KEY, { expiresIn: maxAge });
};

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).send("Email and Password is required.");
        const user = await User.create({ email, password });
        const cookie = createToken(email, user.id);
        res.cookie("jwt", cookie, {
            maxAge,
            secure: true,
            sameSite: "None",
        })
        return res.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
            }
        })
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal server problem.");
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send("Email and Password is required.");

        const user = await User.findOne({ email });
        if (!user) return res.json({ "error": "User doesn't exist." });

        const auth = await bcrypt.compare(password, user.password);
        if (!auth) return res.json({ "error": "Password missmatch." });

        const cookie = createToken(email, user.id);
        res.cookie("jwt", cookie, {
            maxAge,
            secure: true,
            sameSite: "None",
        })

        return res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
                image: user.image,
                firstName: user.firstName,
                lastName: user.lastName,
                color: user.color,
            }
        })

    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal server problem.");
    }
};


const getUserInfo = async (req, res) => {
    try {
        const userData = await User.findById(req.userId);
        if (!userData) return res.status(500).send("User is not found.");

        return res.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            image: userData.image,
            firstName: userData.firstName,
            lastName: userData.lastName,
            color: userData.color,
        })

    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal server problem.");
    }
};


const updateProfile = async (req, res) => {
    try {
        const { userId } = req;
        const { firstName, lastName, color } = req.body;

        if (!firstName || !lastName || color < 0) {
            return res.status(400).send("Firstname, lastname and color required.");
        }

        const userData = await User.findByIdAndUpdate(userId, {
            firstName,
            lastName,
            color,
            profileSetup: true,
        }, { new: true, runValidators: true });

        return res.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            image: userData.image,
            firstName: userData.firstName,
            lastName: userData.lastName,
            color: userData.color,
        })

    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal server problem.");
    }
};

const addProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('File is required.');
        }

        const date = Date.now();
        let fileName = "uploads/profiles/" + date + req.file.originalname;
        renameSync(req.file.path, fileName);

        const updatedUser = await User.findByIdAndUpdate(req.userId, { image: fileName }, { new: true, runValidators: true })

        return res.status(200).json({
            image: updatedUser.image,
        })

    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal server problem.");
    }
};

const removeProfileImage = async (req, res) => {
    try {
        const {userId}=req;
        const user = await User.findById(userId);
        
        if(!user) return res.status(404).send('User not found.')

        if(user.image) {
            unlinkSync(user.image);
        }
        user.image=null;
        
        await user.save();
        
        return res.status(200).send('Profile image remved successfully.')

    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal server problem.");
    }
};
const logOut = async (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:1,secure:true,sameSite:"None"})
        return res.status(200).send('Log Out successfully.')

    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal server problem.");
    }
};


module.exports = { signup, login, getUserInfo, updateProfile, addProfileImage, removeProfileImage, logOut };