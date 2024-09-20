const { Router } = require("express");
const { signup, login, getUserInfo, updateProfile, addProfileImage, removeProfileImage, logOut } = require("../controllers/Auth");
const { verifyToken } = require('../middlewares/Auth')
const multer = require("multer");

const router = Router();
const upload = multer({ dest: "uploads/profiles/" })


router.post("/signup", signup);
router.post("/login", login);
router.get("/user-info", verifyToken, getUserInfo);
router.post("/update-profile", verifyToken, updateProfile);
router.post("/add-profile-image", verifyToken, upload.single('profile-image'), addProfileImage);
router.delete("/remove-profile-image", verifyToken, removeProfileImage);
router.post("/logout",logOut)

module.exports = router;