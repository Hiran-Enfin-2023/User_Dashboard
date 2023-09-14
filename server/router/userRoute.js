const express = require("express");
const { register, login, validateUser } = require("../controllers/user.Controller");
const { authenticateUser } = require("../middleware/authenticate");
const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.get('/validate_user',authenticateUser, validateUser)
module.exports = router
