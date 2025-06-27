const express = require("express");
const hackRouter = express.Router();
const { addHackathon, getHackathon,getIndividualHack,hackRegister,cancelRegister,addComment } = require("../Controllers/hackController");
const { storage } = require("../config/config");
const multer = require("multer");
const upload = multer({storage});

hackRouter.post("/new", upload.single("bannerImage"), addHackathon);
hackRouter.get("/getHackathon",getHackathon)
hackRouter.get("/getIndividualHack/:hackId",getIndividualHack)
hackRouter.post("/register",hackRegister)
hackRouter.post("/cancel",cancelRegister)
hackRouter.post("/addComment",addComment);


module.exports = hackRouter;
