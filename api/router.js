const express = require('express');
const router = express.Router();
const bnUtil = require('../util/bn-connection-util');
const db = require('../db/db');

let students = "";
const { connect, hello, b:c } =   require('../api/helper');





router.get('/students/:token', (req, res) => {
    hello()
    c()

    const token = req.params.token

    db.cards.map((card) => {
        console.log(card.token , card.token === token, token);
        if (card.token == token) {
            bnUtil.cardName = card.card;
            bnUtil.connect(connect);
            return res.status(200).send({
                success: 'true',
                message: 'card retrieved successfully',
                card,
                students
            });
        }
    });
    return res.status(404).send({
        success: 'false',
        message: 'card does not exist',
    });
});

router.get('/hello/', (req, res) => {
    return res.status(200).send("hello");
    res.end()
})

module.exports = router;
