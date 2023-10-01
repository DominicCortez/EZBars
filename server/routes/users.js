const express = require('express')
const router = express.Router()
const {users} = require('../models')
const bcrypt = require("bcrypt")


router.post("/", async (req,res)=> {
    const {useremail , userpassword} = req.body;
    bcrypt.hash(userpassword, 10).then((hash) => {
        users.create({
            useremail : useremail,
            userpassword :hash,
        })
        res.json("SUCCESS")
    })
});

router.post('/login', async (req, res) => {
    const {useremail , userpassword} = req.body;

    const user = await users.findOne({where: {useremail : useremail}});
    if (!user) res.json({ error: "Email Does Not Exist"});

    bcrypt.compare(userpassword, user.userpassword).then((match) =>{
        if(!match) res.json({error :"Incorrect Password"})
        res.json("Login successful")
    })
});

module.exports = router