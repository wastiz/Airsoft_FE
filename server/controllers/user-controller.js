const express = require('express');
const router = express.Router();
const userSchema = require('../models/userSchema');
const config = require("config");
const {check, validationResult} = require("express-validator")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../middlewares/auth-middleware')

//User registration
router.post('/registration',
    [
        check('email', "Invalid email").isEmail(),
        check('password', 'Password must be longer than 3 and shorter than 12 characters').isLength({ min: 3, max: 12 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Invalid request", errors: errors.array() });
            }

            const { username, email, password } = req.body;

            // Проверка наличия пользователя с таким же email или username
            const existingUser = await userSchema.findOne({
                $or: [
                    { email: email },
                    { username: username }
                ]
            });

            if (existingUser) {
                if (existingUser.email === email) {
                    return res.status(400).json({ message: `User with email ${email} already exists` });
                }
                if (existingUser.username === username) {
                    return res.status(400).json({ message: `User with username ${username} already exists` });
                }
            }

            const hashPassword = await bcrypt.hash(password, 8);
            const newId = uuidv4();
            const user = new userSchema({
                _id: newId,
                username,
                email,
                password: hashPassword
            });
            await user.save();

            res.status(201).json({ message: "User was created" });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Server error in creating user" });
        }
    }
);

//validating username or email in login
router.post('/login', async (req, res) => {
    try {
        const { username, password, rememberMe } = req.body;

        const user = await userSchema.findOne({
            $or: [
                { username: username },
                { email: username }
            ]
        });

        if (!user) {
            return res.status(404).json({ message: "Username or email is incorrect" });
        }

        const isPassValid = await bcrypt.compare(password, user.password);
        if (!isPassValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user.id }, "airsoft-fe-key", { expiresIn: rememberMe ? "7d" : "1h" });

        return res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Server error in validating email or username" });
    }
});

//Checking if user is authorized
router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await userSchema.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id}, "airsoft-fe-key", {expiresIn: "1h"})
            return res.json({
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

//Getting user by id
router.get('/id/:id', authMiddleware, async (req, res) => {
    try {
        const user = await userSchema.findById(req.params.id);
        const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.json({token, user});
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

router.get('')

module.exports = router;