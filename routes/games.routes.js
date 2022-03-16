const router = require("express").Router();
const games = require('../models/games.model');

router.get('/', (req, res) => {
    games.findAll()
        .then((result) => {
            res.status(200).json(result);
        })
});

router.get('/:id', (req, res) => {
    games.findOne(req.params.id)
        .then((game) => {
            if (game) {
                res.status(200).json(game)
            }
            else {
                res.status(404).send('game not found')
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Internal Error');
        })
});

router.post('/', async (req, res) => {
    const gameCreation = await games.create(req.body);
    if (gameCreation) {
        return res.status(201).json({gameCreation});
    } else {
        return res.sendstatus(500)
    }
});

router.delete('/:id', async (req, res) => {
    const result = await games.remove(req.params.id);
    if (result === true) {
        return res.status(200).send('game deleted');
    }
    else {
        res.status(500).send('Error deleting game');
    }
});

router.put('/:id', async (req, res) => {
    const gameExist = await games.findOne(req.params.id);
    if (gameExist) {
        const gameExist = await games.update(req.body, req.params.id);
        if (gameExist) {
            return res.status(200).json({...gameExist, ...req.body});
        } else {
            return res.sendstatus(500).send('Error updating game')
        }
    }
    else {
        res.status(404).send('game not found');
    }
});



module.exports = router;