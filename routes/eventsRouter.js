const express = require('express');
const { db } = require('../firebase');
const authenticate = require('../middleware/authenticate');
const eventsRouter = express.Router();
const cors = require('./cors');

// Route for handling all boardgames
eventsRouter.route('/')
    .options(cors.corsWithOptions, authenticate.verifyUser, (req, res) => res.sendStatus(200))
    .get(cors.cors, async (req, res) => {
        try {
            const eventsSnapshot = await db.collection('events').get();
            const events = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            events.sort((a, b) => a.id - b.id)
            res.status(200).json(events);
        } catch (error) {
            console.error('Error fetching events:', error.message);
            res.status(500).send(error.message);
        }
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
        try {
            const newEvents = req.body;
            const addedEvents = await db.collection('events').add(newEvents);
            res.status(201).json({ id: addedEvents.id, ...addedEvents });
        } catch (error) {
            res.status(500).send(error.message);
        }
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
        res.status(403).send('PUT operation not supported on /events');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
        res.status(403).send('DELETE operation not supported on /events');
    });
    
module.exports = eventsRouter;