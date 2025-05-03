const express = require("express");
const auth = require("../middleware/authMiddleware");
const { viewRequests, decideEvent } = require("../controllers/adminController");
const router = express.Router();

router.get("/requests", auth(["admin"]), viewRequests);
router.post("/decision", auth(["admin"]), decideEvent);
router.get("/dashboard", (req, res) => {
    res.json({ message: "Welcome to the Admin Dashboard!" });
  });
module.exports = router;
