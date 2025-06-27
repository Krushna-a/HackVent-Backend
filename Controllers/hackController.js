const Hackathon = require("../models/hackModel");
const cloudinary = require("cloudinary").v2;
const User = require("../models/userModel");

const hackRegister = async (req, res) => {
  const { hackId } = req.body;
  const userId = req.user._id;

  const hack = await Hackathon.findById(hackId);
  const alreadyRegistered = hack.users.some(
    (item) => item.userId.toString() === userId
  );
  if (alreadyRegistered) {
    return res.send("Already Registered");
  }

  hack.users.push({ userId });
  await hack.save();

  const user = await User.findById(userId);
  user.hacks.push(hackId);
  await user.save();

  res.status(200).send("hackathon registeration succssful");
};

const cancelRegister = async (req, res) => {
  try {
    const { hackId } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    user.hacks = user.hacks.filter((item) => item.toString() !== hackId);
    await user.save();

    const hack = await Hackathon.findById(hackId);
    hack.users = hack.users.filter(
      (item) => item.userId.toString() !== userId.toString()
    );
    await hack.save();

    res.status(200).send("Hackathon registration canceled");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getIndividualHack = async (req, res) => {
  const hackId = req.params.hackId;
  const response = await Hackathon.findById(hackId);
  res.status(200).send(response);
};
const getHackathon = async (req, res) => {
  const allHackathons = await Hackathon.find();
  res.status(200).send(allHackathons);
};
const addHackathon = async (req, res) => {
  const hackOwner = req.user._id;
  try {
    const {
      title,
      description,
      location,
      organisedBy,
      customLocation,
      startDate,
      endDate,
      registrationDeadline,
      eligibility,
      teamSize,
      maxTeamSize,
      prizes,
      timeline,
      website,
      contactEmail,
      rules,
    } = req.body;

    const uploadedImg = await cloudinary.uploader.upload(req.file.path);
    const imageUrl = uploadedImg.secure_url;

    const newData = {
      title,
      description,
      location,
      organisedBy,
      customLocation,
      startDate,
      endDate,
      registrationDeadline,
      eligibility,
      teamSize,
      maxTeamSize,
      bannerImage: imageUrl,
      prizes,
      timeline,
      website,
      contactEmail,
      rules,
      hackOwner,
    };

    const isHackExist = await Hackathon.findOne({ title: title });

    if (isHackExist) {
      return res.status(200).send("Hack Already Exist");
    }

    const newHackathon = new Hackathon(newData);
    await newHackathon
      .save()
      .then(() => {
        res.status(200).send("Data is stored");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send("Something Error Occurred");
      });
  } catch (err) {
    console.error("Database save error:", err);
    res.status(400).json({
      error: "Failed to save hackathon",
      details: process.env.NODE_ENV === "development" ? err.message : null,
    });
  }
};

const addComment = async (req, res) => {
  try {
    const { comment, hackId } = req.body;
    const userId = req.user._id;

    const updatedHack = await Hackathon.findOneAndUpdate(
      {
        _id: hackId,
        "users.userId": userId,
      },
      { $set: { "users.$.comment": comment } },
      { new: true }
    );

    if (!updatedHack) {
      await Hackathon.findByIdAndUpdate(
        hackId,
        { $push: { users: { userId, comment } } },
        { new: true }
      );
    }

    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error: Failed to add comment");
    res.status(500).json({ error: "Failed to add comment" });
  }
};

module.exports = {
  addHackathon,
  getHackathon,
  getIndividualHack,
  hackRegister,
  cancelRegister,
  addComment,
};
