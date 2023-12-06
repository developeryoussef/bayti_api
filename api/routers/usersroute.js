const express = require('express');
const router = express.Router();
const { User } = require("../models/userchema.js");
const mongoose = require('mongoose');

router.use(express.json());


router.get('/users/', async (req, res) => {
    const users = await User.find();
    return res.status(200).json(users);
});

router.post('/login/', async (req, res) => {
    if (!req.body.email || req.body.email.length < 10) {
        return res.status(400).json({ message: "email required" });
    }
    else if (!req.body.password || req.body.password.length < 10) {
        return res.status(400).json({ message: "password required" });
    } else {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "invalid email " });
        }

        const isPasswordMatch = req.body.password === user.password ? true : false;
        if (isPasswordMatch === false) {
            return res.status(400).json({ message: "invalid email or password" });
        } else
            if (isPasswordMatch === true) {
                console.log(req.body.password);
                console.log(user.password);
                return res.status(200).json(user);
            }
    }
});

router.post('/register/', async (req, res) => {
    if (!req.body.email || req.body.email.length < 10) {
        return res.status(400).json({ message: "email required" });
    }
    else if (!req.body.password || req.body.password.length < 10) {
        return res.status(400).json({ message: "password required" });
    } else if (!req.body.name || req.body.name.length < 10) {
        return res.status(400).json({ message: "name required" });
    } else if (!req.body.phone) {
        return res.status(400).json({ message: "phone required" });
    }

    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
        return res.status(400).json({ message: "this user already registered" });
    }
    user = new User({
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
    });

    const response = await user.save();
    return res.status(200).json(response);

});

router.put('/edit-user/:id', async (req, res) => {
    console.log(req.body)
    if (!req.body.email || req.body.email.length < 10) {
        return res.status(400).json({ message: "email required" });
    }
    else {
        const newUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                password: req.body.password,
                phone: req.body.phone,
            },
        }, { new: true });
        return res.status(201).json(newUser);

    }

});

router.delete('/delete-user/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.status(201).json(user);
});

router.post('/register-delivery/', async (req, res) => {
    if (!req.body.user) {
        return res.status(500).json({ message: 'user required' })
    }
    let adminuser = await User.findOne({ email: req.body.user });
    if (!adminuser) {
        return res.status(500).json({ message: 'user not found' });
    }
    if (adminuser.role !== "admin") {
        return res.status(501).json({ message: 'you can\'t insert category' });
    }
    if (!req.body.email || req.body.email.length < 10) {
        return res.status(400).json({ message: "email required" });
    }
    else if (!req.body.password || req.body.password.length < 10) {
        return res.status(400).json({ message: "password required" });
    } else if (!req.body.name) {
        return res.status(400).json({ message: "name required" });
    } else if (!req.body.phone) {
        return res.status(400).json({ message: "phone required" });
    }

    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
        return res.status(400).json({ message: "this user already registered" });
    }
    user = new User({
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        role: 'delivery',
    });

    const response = await user.save();
    return res.status(200).json(response);

});


router.post('/register-admin/', async (req, res) => {
    if (!req.body.user) {
        return res.status(500).json({ message: 'user required' })
    }
    let adminuser = await User.findOne({ email: req.body.user });
    if (!adminuser) {
        return res.status(500).json({ message: 'user not found' });
    }
    if (adminuser.role !== "admin") {
        return res.status(501).json({ message: 'you can\'t insert category' });
    }
    if (!req.body.email || req.body.email.length < 10) {
        return res.status(400).json({ message: "email required" });
    }
    else if (!req.body.password || req.body.password.length < 10) {
        return res.status(400).json({ message: "password required" });
    } else if (!req.body.name) {
        return res.status(400).json({ message: "name required" });
    } else if (!req.body.phone) {
        return res.status(400).json({ message: "phone required" });
    }

    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
        return res.status(400).json({ message: "this user already registered" });
    }
    user = new User({
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        role: 'admin',
    });

    const response = await user.save();
    return res.status(200).json(response);

});

module.exports = router;