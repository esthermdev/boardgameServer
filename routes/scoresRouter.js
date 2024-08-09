const express = require('express');
const { db } = require('../firebase');
const authenticate = require('../middleware/authenticate');
const scoresRouter = express.Router();
const cors = require('./cors');

// Route for handling all scores
scoresRouter.route('/')
    .options(cors.corsWithOptions, authenticate.verifyUser, (req, res) => res.sendStatus(200))
    .get(cors.cors, async (req, res) => {
        try {
            const scoresSnapshot = await db.collection('scores').get();
            const scores = scoresSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            scores.sort((a, b) => a.id - b.id)
            res.status(200).json(scores);
        } catch (error) {
            console.error('Error fetching scores:', error.message);
            res.status(500).send(error.message);
        }
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
        try {
            const newScore = req.body;
            const addedScore = await db.collection('scores').add(newScore);
            res.status(201).json({ id: addedScore.id, ...newScore });
        } catch (error) {
            res.status(500).send(error.message);
        }
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
        res.status(403).send('PUT operation not supported on /scores');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
        res.status(403).send('DELETE operation not supported on /scores');
    });

// Route for handling specific scores
scoresRouter.route('/:scoreId')
    .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
    .get(cors.cors, async (req, res) => {
        try {
            const scoreDoc = await db.collection('scores').doc(req.params.scoreId).get();
            if (!scoreDoc.exists) {
                return res.status(404).send('Score not found');
            }
            res.status(200).json({ id: scoreDoc.id, ...scoreDoc.data() });
        } catch (error) {
            res.status(500).send(error.message);
        }
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
        res.status(403).send('POST operation not supported on /scores/:scoreId');
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
        try {
            const updatedScore = req.body;
            await db.collection('scores').doc(req.params.scoreId).set(updatedScore, { merge: true });
            res.status(200).json({ id: req.params.scoreId, ...updatedScore });
        } catch (error) {
            res.status(500).send(error.message);
        }
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
        try {
            await db.collection('scores').doc(req.params.scoreId).delete();
            res.status(204).send('Successfully deleted score.');
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

module.exports = scoresRouter;
