const express = require('express');
const router = express.Router();
const {findActors, findActorById, saveActor} = require('../db');

router.get('/', (req, res) => {
    const callback = (actors) => {
        res.render('actors', {actors});
    };
    findActors(callback);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const callback = function (actor) {
        res.render('actor', {actor});
    };
    findActorById(id, callback);
});

router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    const callback = function (actor) {
        res.render('actor_edit', {actor});
    };
    findActorById(id, callback);
});

router.post('/:id', (req, res) => {
    const id = req.params.id;
    saveActor(id, req.body.name, req.body.character);
    res.redirect(`/actors/${id}`);
});

module.exports = router;