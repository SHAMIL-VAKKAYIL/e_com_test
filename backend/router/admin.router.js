const router = require('express').Router()
const admin = require('../models/adminSchema')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')



router.post('/Adminsignup', async (req, res) => {

    req.body.password = crypto.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()


    try {
        console.log(req.body);
        
        const newadmin = new admin(req.body);
        await newadmin.save();
        res.status(200).json({ message: 'Signup successfully' });

    } catch (error) {
        console.log(error, 'signup error');
        res.status(400).json({ message: ' error saving data', error });
    }
})

router.post('/Adminlogin', async (req, res) => {
    try {
        const adminch = await admin.findOne({
            email: req.body.email
        })
        console.log(req.body);
        
        if (!adminch) {
            return res.status(404).json({ message: 'invalid credential' });
        } else {
            const passMatch = crypto.AES.decrypt(adminch.password, process.env.SECRET_KEY)
            console.log(passMatch);
            const orignalPass = passMatch.toString(crypto.enc.Utf8)
            console.log(orignalPass);

            if (orignalPass === req.body.password) {
                const token = jwt.sign({ id: adminch._id }, process.env.TOKEN_KEY, { expiresIn: '10days' });
                console.log(token);


                res.status(200).json({ Token: token, adminchId: admin._id });
            } else {
                res.status(400).json({ message: 'invalid credintial' });
            }

        }


    } catch (error) {
        console.log(error, 'login error');
        res.status(400).json({ message: ' error saving data', error });
    }


})

module.exports = router