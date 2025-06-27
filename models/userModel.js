const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  hacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hack", required: false }],
});

userSchema.plugin(passportLocalMongoose);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
