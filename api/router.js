const express = require('express');
const router = express.Router();
const bnUtil = require('../bn-connection-util');
const db = require('../db/db');
const studentNamespace = 'org.university';
const resourceName = 'Student';
let students = "";


function connect() {
    var registry = {}

    return bnUtil.connection.getAssetRegistry(studentNamespace + '.' + resourceName).then((reg) => {
        registry = reg;

        console.log('Received Registry: ', registry.id);

        return registry.getAll();
    }).then((studentsObjects) => {
        bnUtil.disconnect();
        students = JSON.stringify(studentsObjects);
    }).catch((error) => {
        console.log(error);
        bnUtil.disconnect();
    });
}


router.get('/students/:token', (req, res) => {

    console.log(req);
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
