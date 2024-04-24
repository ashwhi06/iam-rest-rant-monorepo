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

// get the current user's profile
router.get("/profile", async (req, res) => {
  console.log(req.session.userId); 
  try {
    let user = await User.findOne({
      where: {
        userId: req.session.userId,
      },
    });
    res.json({ user });
  } catch (err) {
    res.json(null);
  }
});

// logout the current user
router.post('/super-important-route', async (req, res) => {
    if(req.session.userId){
        console.log('Do the really super important thing')
        res.send('Done')
    } else {
        console.log('You are not authorized to do the super important thing')
        res.send('Denied')
    }
})


module.exports = router;
