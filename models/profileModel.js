const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  fullName: { type: String },
  email: { type: String },
  location: { type: String },
  college: { type: String },
  course: { type: String },
  graduatingYear: { type: Number },
  courseDuration: { type: Number, enum: [3, 4] },
  gender: { type: String, enum: ["male", "female"] },
  profileImage: { type: String, default: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
