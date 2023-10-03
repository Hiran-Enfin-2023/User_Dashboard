const express = require("express");
const { register, login, validateUser, allUser, forgotPassword, resetPassword, imageUpload, updateProfile } = require("../controllers/user.Controller");
const { authenticateUser } = require("../middleware/authenticate");
const upload = require("../config/multer");
const router = express.Router();

router.post("/register", upload.single("user_image"), register)
router.post("/login",login);
router.patch("/image_upload/:id", upload.single("user_image"), imageUpload)
router.get("/all/users",allUser)
router.get('/validate_user',authenticateUser, validateUser)
router.post('/password/forgot/',forgotPassword)
router.post('/password/reset/:token',resetPassword);
router.put('/update/profile/:id', updateProfile)
module.exports = router
