const express = require('express');
const routee = express.Router();
const dbProm = require ('..db');
const { router } = require('../app');
const db = require('../db');

router.get('/dogs', async (req, res) => {
    try {
        const dbProm = await adProm;
        const [rows] = await.execute('
            SELECT Dogs.name, Dogs.size, User.username AS owner
            FROM Dogs JOIN User ON Dogs.owner_id = User.user_id');
            res.json(rows);
    } catch {
        res.json({})
    }
}

/api/dogs
/api/walkrequests/open
/api/walkers/summary