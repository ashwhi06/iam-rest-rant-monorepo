const router = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt");

const { User } = db;

router.post("/", async (req, res) => {
  let user = await User.findOne({
    where: {email: req.body.email}

  });
  if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
    res.status(401).json({
      error: "Could not authenticate user"
    })
  } else {
    res.json({user});
  }
});

module.exports = router;
