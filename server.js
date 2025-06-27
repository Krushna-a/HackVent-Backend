require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectToDB = require("./db/db");
connectToDB();
const app = express();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/userModel");
const userRouter = require("./Routes/user.routes");
const hackRouter = require("./Routes/hackathon");
const MongoStore = require("connect-mongo");

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URI,
      ttl: 14 * 24 * 60 * 60,
    }),
    cookie: {
      httpOnly: true,
      secure: true, 
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/api/user", userRouter);
app.use("/api/hack", hackRouter);

app.get("/protected", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.json({ message: "Profile data", user: req.user });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
  console.log(`Port is connected to ${PORT}`);
});
