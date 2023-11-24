const router = require("express").Router();
const Post = require("../models/post");
const requireSignin = require("../middleware/Authenticate");

// CREATE NEW POST;

router.post("/", requireSignin, async (req, res) => {
  const username = req.user.username;

  try {
    const { title, description, categories } = req.body;

    const blogData = {
      title,
      description,
      categories,
      username,
    };

    const savedPost = new Post(blogData);

    await savedPost.save();

    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// UPDATE POST

router.put("/:id", async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id);
  if (post.username === req.body.username) {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can only update your post");
  }
  // } catch (err) {
  //     res.status(500).json("status not found");
  // }
});

// DELETE POST

router.delete("/:id", async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id);
  if (post.username === req.body.username) {
    try {
      const updatedPost = await post.delete(findByIdAndDelete);
      res.status(200).json("Post has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can only delete your post");
  }
  // } catch (err) {
  //     res.status(500).json("status not found");
  // }
});

// GET POST

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
  // } catch (err) {
  //     res.status(500).json("status not found");
  // }
});

// GET ALL POSTS

router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    const posts = await Post.find({});
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
