const router = require('express').Router()
const userSchema = require('../models/user.model')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')



router.post('/signup', async (req, res) => {

    req.body.password = crypto.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()

    try {
        const newUser = new userSchema(req.body);
        await newUser.save();
        res.status(200).json({ message: 'Signup successfully' });

    } catch (error) {
        console.log(error, 'signup error');
        res.status(400).json({ message: ' error saving data', error });
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await userSchema.findOne({
            email: req.body.email
        })
        if (!user) {
            return res.status(404).json({ message: 'invalid credential' });
        } else {
            const passMatch = crypto.AES.decrypt(user.password, process.env.SECRET_KEY)
            const orignalPass = passMatch.toString(crypto.enc.Utf8)


            if (orignalPass == req.body.password) {

                const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, { expiresIn: '10days' });
                res.status(200).json({ Token: token, userId: user._id });
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