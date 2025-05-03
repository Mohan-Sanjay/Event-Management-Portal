const express = require("express");
const auth = require("../middleware/authMiddleware");
const { createEvent, myEvents } = require("../controllers/organizerController");
const router = express.Router();

router.post("/create", auth(["organizer"]), createEvent);
router.get("/mine", auth(["organizer"]), myEvents);
router.get("/dashboard", (req, res) => {
    res.json({ message: "Welcome to the Organizer Dashboard!" });
  });


module.exports = router;
