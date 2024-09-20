const Messages = require("../models/Messages");
const { mkdir, renameSync } = require("fs")

const getMessages = async (req, res) => {
    try {
        const user1 = req.userId;
        const user2 = req.body.id;
        if (!user1 || !user2) {
            return res.status(400).send("Both user's id are required.")
        }

        const messages = await Messages.find({
            $or: [
                { sender: user1, recipient: user2 }, { sender: user2, recipient: user1 }
            ]
        }).sort({ timeStamp: 1 })

        return res.status(200).json({ messages })

    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal server problem.");
    }
};


const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("File is require.")
        }

        const date = Date.now()
        let fileDir = `uploads/files/${date}`
        let fileName = `${fileDir}/${req.file.originalname}`
        mkdir(fileDir, { recursive: true }, (err) => {
            if (err) {
                console.error('Error creating directory:', err);
            }
        })
        renameSync(req.file.path, fileName);

        return res.status(200).json({ filePath: fileName })

    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal server problem.");
    }
};

module.exports = { getMessages, uploadFile }