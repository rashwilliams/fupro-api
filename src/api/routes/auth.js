const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const requireSignin = require("../middleware/Authenticate");
dotenv.config();
// REGISTER;

router.post("/register", async (req, res) => {
  try {
    const { email } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ error: "user does not exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    return res.status(200).json({ message: "profile has been created", user });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "wrong credentials" });
    }

    const validated = await bcrypt.compare(req.body.password, user.password);

    if (!validated) {
      return res.status(400).json({ error: "wrong credentials" });
    }

    const { password, ...others } = user._doc;

    const payload = {
      id: others._id,
      username: others.username,
    };

    const token = await jwt.sign(payload, process.env.SECRET, {
      expiresIn: 36000,
    });

    const cookieOptions = {
      expires: 36000,
      maxAge: 59 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };

    return res
      .cookie("authToken", token, cookieOptions)
      .json({ statusCode: 200, message: "login successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET USER

router.get("/me", requireSignin, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/logout", (req, res) => {
  // logout user controller function

  res.clearCookie("authToken");
  return res.json({ message: "Signout Successfully" });
});

module.exports = router;
