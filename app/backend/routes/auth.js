const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = "graphicerahilluniversity2022";

router.post('/create/User', [
    body('name', 'Enter a valid name').isLength({ min: 3 }), body('email', "Enter a valid email").isEmail(), body('password', "Password must be atleast 5 characters ").isLength({ min: 5 })
], async (req, res) => {
    //console.log(req.body);
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ success, error: "Sorry a user with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    secPasswd = await bcrypt.hash(req.body.password, salt);

    //creating new user
    user = User.create(
        {
            name: req.body.name,
            password: secPasswd,
            email: req.body.email,

        }
    ).then(
        user => {
            const data = {
                user: {
                    id: user.id
                }
            };
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            // console.log(authToken);
            res.json({ success, authToken });
        }
    )
        .catch(err => {
            //if there is some error while creating user this will be executed
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
        );
})

router.post('/login/User', [body('email', "Enter a valid email").isEmail(), body('password', "Password cannot be empty").exists()
], async (req, res) => {
    //console.log(req.body);
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        // console.log(authToken);
        res.json({ success, authToken });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }


})
router.get('/get/User', fetchUser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;