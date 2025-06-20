const express = require('express');
const routee = express.Router();
const dbProm = require ('..db');
const { router } = require('../app');
const db = require('../db');

router.get('/dogs', async (req, res) => {
    try {
        const dbProm = await adProm;
        const [rows] = (await db).execute('
            SELECT wr.*, d.name AS dog_name
            FROM walkrequests wr
            JOIN Dogs d ON wr.dog_id = d.dog_id
            WHERE wr.status = 'open'
            ');
            res.json(rows);
    } catch {
        res.json
    }
}

/api/dogs
/api/walkrequests/open
/api/walkers/summary