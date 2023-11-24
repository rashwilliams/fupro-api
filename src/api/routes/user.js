const router = require("express").Router();
const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcrypt");

// UPDATE;

router.put("/id", async (req, res) => {
  if (req.body.userid === req.params.id) {
    id(req.body.password);
    {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const upadatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(upadatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can only update your account");
  }
});

// DELETE

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.param.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user has been deleted!");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("user not found");
    }
  } else {
    res.status(401).json("You can only delete your account");
  }
});

module.exports = router;
