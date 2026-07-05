const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const path = require("path");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();

// Security
app.use(helmet());

// Parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);

// Cookies
app.use(cookieParser());

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || "change_this_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

// Serve frontend
app.use(express.static(path.join(__dirname, "client")));

// Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "login.html"));
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 AniVerse is running at http://localhost:${PORT}`);
});