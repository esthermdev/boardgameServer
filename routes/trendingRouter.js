const express = require('express');
const { db } = require('../firebase');
const authenticate = require('../middleware/authenticate');
const trendingRouter = express.Router();
const cors = require('./cors');

// Route for handling all boardgames
trendingRouter.route('/')
    .options(cors.corsWithOptions, authenticate.verifyUser, (req, res) => res.sendStatus(200))
    .get(cors.cors, async (req, res) => {
        try {
            const trendingSnapshot = await db.collection('trending').get();
            const trending = trendingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            trending.sort((a, b) => a.id - b.id)
            res.status(200).json(trending);
        } catch (error) {
            console.error('Error fetching trending games:', error.message);
            res.status(500).send(error.message);
        }
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
        try {
            const newTrending = req.body;
            const addedTrending = await db.collection('trending').add(newTrending);
            res.status(201).json({ id: addedTrending.id, ...newTrending });
        } catch (error) {
            res.status(500).send(error.message);
        }
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
        res.status(403).send('PUT operation not supported on /boardgames');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
        res.status(403).send('DELETE operation not supported on /boardgames');
    });
    
module.exports = trendingRouter;