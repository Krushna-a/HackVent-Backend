const express = require("express");
const passport = require("passport");
const userRouter = express.Router();
const { storage } = require("../config/config");
const multer = require("multer");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");
const upload = multer({ storage });
const {
  loginUser,
  registerUser,
  logOut,
  getProfile,
  getCommentUser,
  editProfile,
} = require("../Controllers/userController");

const requireAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  next();
};

userRouter.post("/register", registerUser);

userRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.json({ message: "Invalid credentials" });

    req.logIn(user, (err) => {
      if (err) return next(err);
      res.json({
        message: "Logged in successfully",
        user: { id: user._id, email: user.email },
      });
    });
  })(req, res, next);
});

userRouter.post("/logout", logOut);
userRouter.get("/profile", requireAuth, getProfile);
userRouter.post("/getCommentUser", getCommentUser);
userRouter.post(
  "/profile",
  requireAuth,
  upload.single("profileImage"),
  editProfile
);

const emailLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // max 3 requests per minute
  message: "Too many emails sent. Please try again later."
});
userRouter.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "krushnaboinwad70@gmail.com",
        pass: "@72Kru19sh54na", // Gmail App Password
      },
    });

    await transporter.sendMail({
      from: email,
      to: "krushnaboinwad70@gmail.com",
      subject: `Message from ${name}`,
      text: message,
    });

    res.status(200).send("Email sent successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error sending email.");
  }
});

module.exports = userRouter;
