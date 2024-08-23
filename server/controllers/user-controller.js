const express = require('express');
const router = express.Router();
const userSchema = require('../models/userSchema');
const config = require("config");
const {check, validationResult} = require("express-validator")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../middlewares/auth-middleware')
const multer = require("multer");
const addNotification = require('../functions');

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
                password: hashPassword,
            });
            await user.save();
            await addNotification("app", { title: "Welcome to airsoft community", message: "Congrats on creating new account, enjoy to explore airsoft community", userId: newId });
            res.status(201).json({ message: "User was created" });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Server error in creating user" });
        }
    }
);

//Login
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

        const token = jwt.sign({ id: user.id }, "airsoft-fe-key", { expiresIn: rememberMe ? "30d" : "1d" });

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
            const token = jwt.sign({id: user.id}, "airsoft-fe-key", {expiresIn: "30d"})
            return res.json({
                token,
                _id: user.id,
                username: user.username,
                email: user.email,
                notifications: user.notifications
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })


// Multer storage for user's avatars
const avatarStorage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'server/uploads/avatar-uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: avatarStorage });

// Маршрут для загрузки аватара
router.post('/uploadAvatar', upload.single('avatar'), (req, res) => {
    try {
        // Проверяем, был ли загружен файл
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        res.json({
            url: `http://localhost:5000/uploads/avatar-uploads/${req.file.filename}`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

//Getting user's username, firstName and Lastname by array for UserCards
router.post('/user-card/by-ids', async (req, res) => {
    try {
        const { ids } = req.body;
        if (!Array.isArray(ids)) {
            return res.status(400).json({ message: 'Invalid input, expected an array of IDs' });
        }
        const users = await userSchema.find({ _id: { $in: ids } }, 'username profile.firstName profile.lastName profile.avatar');

        res.json(users);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('')

module.exports = router;