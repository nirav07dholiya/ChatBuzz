const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./routes/Auth");
const contactRouter = require("./routes/Contact");
const setupSocket = require("./socket");
const messagesRouter = require("./routes/Messages");
const channelRoutes = require("./routes/Channel");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials:true,
}))

app.use('/uploads/profiles',express.static('uploads/profiles'))
app.use('/uploads/files',express.static("uploads/files"))

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",router);
app.use("/api/contacts",contactRouter);
app.use("/api/messages",messagesRouter);
app.use("/api/channel",channelRoutes);

const server = app.listen(port, () => {
    mongoose.connect(databaseURL).then(() => {
        console.log("Database Connect successfully");
    }).catch(err => {
        console.log("DB error: ", err);
    })
    console.log(`Server is running at http://localhost:${port}`);
})

setupSocket(server);