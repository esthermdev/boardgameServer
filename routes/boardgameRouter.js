const express = require('express');
const { db } = require('../firebase');
const authenticate = require('../middleware/authenticate');
const boardgameRouter = express.Router();
const cors = require('./cors');

// Route for handling all boardgames
boardgameRouter.route('/')
    .options(cors.corsWithOptions, authenticate.verifyUser, (req, res) => res.sendStatus(200))
    .get(cors.cors, async (req, res) => {
        try {
            const boardgamesSnapshot = await db.collection('boardgames').get();
            const boardgames = boardgamesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            boardgames.sort((a, b) => a.id - b.id)
            res.status(200).json(boardgames);
        } catch (error) {
            console.error('Error fetching boardgames:', error.message);
            res.status(500).send(error.message);
        }
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
        try {
            const newBoardgame = req.body;
            const addedBoardgame = await db.collection('boardgames').add(newBoardgame);
            res.status(201).json({ id: addedBoardgame.id, ...newBoardgame });
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

// Route for handling specific boardgames
boardgameRouter.route('/:boardgameId')
    .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
    .get(cors.cors, async (req, res) => {
        try {
            const boardgameDoc = await db.collection('boardgames').doc(req.params.boardgameId).get();
            if (!boardgameDoc.exists) {
                return res.status(404).send('Boardgame not found');
            }
            res.status(200).json({ id: boardgameDoc.id, ...boardgameDoc.data() });
        } catch (error) {
            res.status(500).send(error.message);
        }
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
        res.status(403).send('POST operation not supported on /boardgames/:boardgameId');
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
        try {
            const updatedBoardgame = req.body;
            await db.collection('boardgames').doc(req.params.boardgameId).set(updatedBoardgame, { merge: true });
            res.status(200).json({ id: req.params.boardgameId, ...updatedBoardgame });
        } catch (error) {
            res.status(500).send(error.message);
        }
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
        try {
            await db.collection('boardgames').doc(req.params.boardgameId).delete();
            res.status(204).send('Successfully deleted boardgame.');
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

module.exports = boardgameRouter;
