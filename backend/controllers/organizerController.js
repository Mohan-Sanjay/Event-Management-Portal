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
  
  exports.createEvent = async (req, res) => {
    const db = getHallDB(req.user.username);
    const event = new db.Event({ ...req.body, organizer: req.user.id });
    await event.save();
    res.status(201).json(event);
  };
  
  exports.myEvents = async (req, res) => {
    const db = getHallDB(req.user.username);
    const events = await db.Event.find({ organizer: req.user.id });
    res.json(events);
  };
  