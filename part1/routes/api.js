const express = require('express');
const routee = express.Router();
const dbProm = require ('..db');
const { router } = require('../app');
const db = require('../db');

router.get('/dogs', async (req, res) => {
    try {
        const dbProm = await adProm;
        const [rows] = (await db).execute('
            SELECT WalkRequests.*, 
            ');
    } catch {

    }
}

/api/dogs
/api/walkrequests/open
/api/walkers/summary