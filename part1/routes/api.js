const express = require('express');
const routee = express.Router();
const dbProm = require ('..db');
const { router } = require('../app');
const db = require('../db');

router.get('/dogs', async (req, res) => {
    try {
        const dbProm = await adProm;
    
            res.json(rows);
    } catch {
        res.json
    }
}

/api/dogs
/api/walkrequests/open
/api/walkers/summary