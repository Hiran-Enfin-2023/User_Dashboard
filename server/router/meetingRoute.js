const express = require("express");
const { createMeeting, meetings, DetailMeeting, EditMeeting, deActivate } = require("../controllers/meetingController");
const router = express.Router();

router.post("/addMeeting",createMeeting);
router.get('/all/meetings',meetings);
router.get('/:id',DetailMeeting);
router.put('/update/:id',EditMeeting);
router.patch('/deactivate/:id',deActivate);

module.exports = router;