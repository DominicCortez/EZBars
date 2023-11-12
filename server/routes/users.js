const express = require('express')
const router = express.Router()
const {users} = require('../models')
const bcrypt = require("bcrypt")
const {sign} = require('jsonwebtoken')


router.post("/", async (req,res)=> {
    try{
        const {useremail , userpassword} = req.body;
        bcrypt.hash(userpassword, 10).then((hash) => {
            users.create({
                useremail : useremail,
                userpassword :hash,
            })
            res.json("SUCCESS")
        })
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
});

router.post('/login', async (req, res) => {
    try{
        const {useremail , userpassword} = req.body;

        const user = await users.findOne({where: {useremail : useremail}});
        if (!user) res.json({ error: "Email Does Not Exist"});
    
        bcrypt.compare(userpassword, user.userpassword).then((match) =>{
            if(!match) res.json({error :"Incorrect Password"})
    
            const accessToken = sign({useremail : user.useremail, id:user.id},"hiddeninfo");
            res.json(accessToken);
        })
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
});

module.exports = router