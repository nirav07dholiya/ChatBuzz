const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    ],
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "messages",
            required: true,
        },
    ],
    createAt: {
        type: Date,
        default: Date.now(),
    },
    updateAt: {
        type: Date,
        default: Date.now(),
    },
});

channelSchema.pre("save", function (next) {
    this.updateAt = Date.now();
    next();
});

channelSchema.pre("findOneAndUpDate", function (next) {
    this.set({ updateAt: Date.now() });
    next();
});

const Channel = mongoose.model("channels",channelSchema)

module.exports = Channel