const dbMap = {
    homije_baba: require("../db/homije_baba"),
    mahatma_gandhi: require("../db/mahatma_gandhi"),
    sir_cv_raman: require("../db/sir_cv_raman"),
  };
  
  function getHallDB(username) {
    if (username.includes("homije")) return dbMap.homije_baba;
    if (username.includes("mahatma")) return dbMap.mahatma_gandhi;
    return dbMap.sir_cv_raman;
  }
  
  exports.viewRequests = async (req, res) => {
    const db = getHallDB(req.user.username);
    const events = await db.Event.find({ status: "pending" }).populate("organizer", "username");
    res.json(events);
  };
  
  exports.decideEvent = async (req, res) => {
    const db = getHallDB(req.user.username);
    const { eventId, decision } = req.body;
  
    const event = await db.Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
  
    if (decision === "approved") {
      const existing = await db.Event.findOne({ date: event.date, status: "approved" });
      if (existing && existing._id.toString() !== eventId) {
        return res.status(400).json({ message: "Conflict on date" });
      }
    }
  
    event.status = decision;
    await event.save();
  
    res.json({ message: "Decision saved" });
  };
  