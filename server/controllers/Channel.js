const User = require("../models/User");
const Channel = require("../models/Channel");
const { default: mongoose } = require("mongoose");

const createChannel = async (req, res) => {
    try {
        const { name, members } = req.body;
        const userId = req.userId;

        const admin = await User.findById(userId);

        if (!admin) {
            return res.status(400).send("Admin user not found.");
        }

        const validMembers = await User.find({ _id: { $in: members } });
        if (validMembers.length !== members.length) {
            return res.status(400).send("Some users are not valid users.");
        }

        const newChannel = new Channel({
            name,
            members,
            admin: userId,
        });

        await newChannel.save();
        return res.status(201).json({ channel: newChannel });
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal server problem.");
    }
};

const getUserChannels = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userId);
        const channels = await Channel.find({
            $or: [{ admin: userId }, { members: userId }],
        }).sort({ updateAd: -1 });

        return res.status(201).json({ channels });
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal server problem.");
    }
};
const getChannelMessages = async (req, res) => {
    try {
        const { channelId } = req.params;  

        const channel = await Channel.findById(channelId).populate({
            path: "messages",
            populate: {
                path: "sender",
                select: "firstName lastName email image color _id",
            },
        });
        
        if (!channel) {
            return res.status(404).send("Channel not found.");
        }

        const messages = channel.messages;

        return res.status(201).json({ messages });

    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal server problem.");
    }
};

module.exports = { createChannel, getUserChannels, getChannelMessages };
