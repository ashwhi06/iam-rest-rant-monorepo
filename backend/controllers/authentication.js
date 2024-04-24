const router = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt");

const { User } = db;

router.post("/", async (req, res) => {
  let user = await User.findOne({
    // find the user by email
    where: {
      email: req.body.email,
    },
  });

  if (
    !user ||
    !(await bcrypt.compare(req.body.password, user.passwordDigest))
  ) {
    // if the user doesn't exist or the password doesn't match
    res.status(401).json({
      error: "Could not authenticate user",
    });
  } else {
    res.session.userId = user.userId; // set the session
    res.json({ user });
  }
});

router.get("/profile", async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });
    res.json({ user });
  } catch (err) {
    res.json(null);
  }
});

module.exports = router;
