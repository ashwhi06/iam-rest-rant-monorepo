const router = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("json-web-token");

const { User } = db;

// POST /api/auth/register
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
    res.status(404).json({
      error: "Could not authenticate user",
    });
  } else {
    const result = await jwt.encode(process.env.JWT_SECRET, {
      id: user.userId,
    });
    res.json({ user: user, token: result.value });
  }
});

// get the current user's profile
router.get("/profile", async (req, res) => {
  // console.log(req.session.userId);

  try {
    const [authorizationMethod, token] = req.headers.authorization.split(" ");

    if (authorizationMethod == "Bearer") {
      // const result = await jwt.decode(token, process.env.JWT_SECRET);

      // const id = result.value;

      let user = await User.findOne({
        where: {
          userId: req.session.userId,
        },
      });
      res.json({ user });
    }
  } catch (err) {
    res.json(null);
  }
});

// logout the current user
router.post("/super-important-route", async (req, res) => {
  if (req.session.userId) {
    console.log("Do the really super important thing");
    res.send("Done");
  } else {
    console.log("You are not authorized to do the super important thing");
    res.send("Denied");
  }
});

module.exports = router;
