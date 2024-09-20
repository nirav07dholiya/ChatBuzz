const mongoose = require("mongoose");
const User = require("../models/User");
const Messages = require("../models/Messages");

const searchContacts = async (req, res) => {
    try {
        const { searchTerm } = req.body;
        if (searchTerm == undefined || searchTerm == null) {
            return res.status(400).send("searchTerm is required.");
        }

        const sanitisedSearchTerm = searchTerm.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

        const regex = new RegExp(sanitisedSearchTerm, "i");

        const contacts = await User.find({
            $and: [
                { _id: { $ne: req.userId } },
                {
                    $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
                },
            ],
        });

        return res.status(200).json({ contacts });
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal server problem.");
    }
};

const getContactsForDMList = async (req, res) => {
    try {
        let { userId } = req;
        userId = new mongoose.Types.ObjectId(userId)

        console.log("userID is: ",userId);
        const contacts = await Messages.aggregate([
            {
                $match: {
                    $or: [{ sender: userId }, { recipient: userId }],
                },
            },
            {
                $sort:{timeStamp:-1}
            },
            {
                $group: {
                    _id: {
                        $cond: {
                            if: { $eq: ["$sender", userId] },
                            then: "$recipient",
                            else: "$sender",
                        },
                    },
                    lastMessageTime: { $first: "$timeStamp" },
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "contactInfo",
                },
            },
            {
                $unwind:"$contactInfo"
            },
            {
                $project:{
                    _id:1,
                    lastMessageTime:1,
                    email:"$contactInfo.email",
                    firstName:"$contactInfo.firstName",
                    lastName:"$contactInfo.lastName",
                    image:"$contactInfo.image",
                    color:"$contactInfo.color",
                }
            },{
                $sort:{lastMessageTime:-1}
            }
        ]);

        return res.status(200).json({ contacts });
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal server problem.");
    }
};

module.exports = { searchContacts, getContactsForDMList };
