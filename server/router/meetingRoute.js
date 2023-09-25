const express = require("express");
const { createMeeting, meetings, DetailMeeting, EditMeeting, deActivate, joinMeeting } = require("../controllers/meetingController");
const { authenticateUser } = require("../middleware/authenticate");
const router = express.Router();

router.post("/addMeeting",createMeeting);
router.get('/all/meetings',meetings);
router.get('/:id',DetailMeeting);
router.get("/join/:slug",authenticateUser, joinMeeting)
router.put('/update/:id',EditMeeting);
router.patch('/deactivate/:id',deActivate);

module.exports = router;