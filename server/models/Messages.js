const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "User",
    },
    messageType: {
        type: String,
        enum: ["text", "file"],
        required: true,
    },
    content: {
        type: String,
        required: function () {
            return this.messageType == "text";
        },
    },
    fileUrl: {
        type: String,
        required: function () {
            return this.messageType == "file";
        },
    },
    timeStamp: {
        type: Date,
        default: Date.now(),
    },
})

const Messages = mongoose.model("Messages", messageSchema);

module.exports = Messages;