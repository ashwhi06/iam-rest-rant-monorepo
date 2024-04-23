const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db

router.post('/', async (req, res) => {
    let{ password, ...rest } = req.body;
    const password_digest = bcrypt.hashSync(password, 10);

    const user = await User.create({
        ...rest,
        passwordDigest: bcrypt.hashSync(password, 10)
    })
    res.json(user)
    console.log(user)
})


router.get('/', async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

module.exports = router