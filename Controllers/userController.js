const express = require("express");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const profile = await Profile.findOne({ userId: userId });

    if (!profile) {
      return res
        .status(404)
        .send({ message: "Profile not found for this user" });
    }

    res.send({ message: "User profile", profile });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Error fetching profile" });
  }
};
const getCommentUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const profile = await Profile.findOne({ userId: userId });

    if (!profile) {
      return res
        .status(404)
        .send({ message: "Profile not found for this user" });
    }

    res.send({ message: "User profile", profile });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Error fetching profile" });
  }
};

const editProfile = async (req, res) => {
  const {
    fullName,
    location,
    course,
    college,
    graduatingYear,
    courseDuration,
    gender,
  } = req.body;

  try {
    const userId = req.user._id;
    const currUser = await User.findById(userId);
    const email = currUser.email;

    const profile = await Profile.findOne({ userId: userId });
    let imageUrl = null;
    if (req.file) {
      const uploadedImg = await cloudinary.uploader.upload(req.file.path);
      imageUrl = uploadedImg.secure_url;
    }

    let profileDetails = {
      fullName,
      location,
      course,
      college,
      graduatingYear,
      courseDuration,
      gender,
      email,
      userId,
    };
    if (imageUrl) {
      profileDetails = { ...profileDetails, profileImage: imageUrl };
    }
    const cleanedData = Object.fromEntries(
      Object.entries(profileDetails).filter(
        ([_, value]) => value !== "" && value !== undefined && value !== null
      )
    );

    if (profile) {
      const updatedProfile = await Profile.findOneAndUpdate(
        { userId },
        { $set: cleanedData },
        { new: true }
      );

      if (!updatedProfile) {
        console.log("Profile not found");
        return res.status(400);
      }
      return res
        .status(201)
        .json({ message: "User Profile Updated", updatedProfile });
    } else {
      const newProfile = new Profile(cleanedData);

      const result = await newProfile.save();

      return res.status(201).json(result);
    }
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message, 
    });
  }
};

const loginUser = (req, res) => {
  try {
    return res.json({
      message: "Logged in successfully",
      user: {
        id: req.user._id,
      },
    });
  } catch (error) {
    res.json(error.message);
  }
};

const logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).send("Logged Out Successfully");
  });
};

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUserByEmail = await User.findOne({ email });
    const existingUserByUserName = await User.findOne({ username });
    if (existingUserByEmail || existingUserByUserName) {
      return res.json({ message: "User already exists" });
    }
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      res.status(200).send({ message: "User registerd successfully" });
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).send("Registration failed");
  }
};

module.exports = {
  loginUser,
  registerUser,
  logOut,
  getProfile,
  editProfile,
  getCommentUser,
};
