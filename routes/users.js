const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../firebase');
const authenticate = require('../middleware/authenticate');
const router = express.Router();
const cors = require('./cors');


// Get all users
router.get('/', cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    try {
        const usersSnapshot = await db.collection('users').get();
        const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).send(error.message);
    }
});

// Registration route
router.post('/register', cors.corsWithOptions, async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    try {
        const userSnapshot = await db.collection('users').where('username', '==', username).get();
        if (!userSnapshot.empty) {
            return res.status(400).send('Username already exists');
        } 

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = { username, password: hashedPassword };

        await db.collection('users').add(newUser);
        res.status(201).send({success: true, status: 'Registration Successful!'});

    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Login route
router.post('/login', cors.corsWithOptions, async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }

    try {
        const userSnapshot = await db.collection('users').where('username', '==', username).get();
        if (userSnapshot.empty) {
            return res.status(400).send('Invalid credentials.');
        }

        const userDoc = userSnapshot.docs[0];
        const user = userDoc.data();

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials.');
        }

        const token = jwt.sign({ id: userDoc.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({success: true, token: token, status: `You are successfully logged in user: ${username}!` });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Protected route example
router.get('/profile', authenticate.verifyUser, (req, res) => {
    res.status(200).json(req.user);
});

module.exports = router;