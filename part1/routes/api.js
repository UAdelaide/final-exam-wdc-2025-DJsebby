const express = require('express');
const routee = express.Router();
const dbProm = require ('..db');
const { router } = require('../app');
const db = require('../db');

router.get('/dogs', async (req, res) => {
    try {
        const dbProm = await adProm;
        const [rows] = await db.execute(`
            SELECT Dogs.name, Dogs.size, User.username AS owner
            FROM Dogs JOIN User ON Dogs.owner_id = User.user_id`);
            res.json(rows);
    } catch {
        res.json({Error: 'couldnt fetch dogs route' })
    }
});

router.get('/walkrequests/open', async (req, res) => {
    try {
        const dbProm = await adProm;
        const [rows] = await db.execute(`
            SELECT WalkRequests.*, Dogs.name AS dog_name
            FROM WalkRequests
            JOIN Dogs ON WalkRequests.dog_id = Dogs.dog_id
            WHERE WalkRequests.status = 'open' `);
            res.json(rows);
    } catch {
        res.json({Error: 'couldnt fetch walkrequests route' })
    }
});

router.get('/walkers/summary', async (req, res) => {
    try {
        const dbProm = await adProm;
        const [rows] = await db.execute(`
            SELECT username AS walker, COUNT(*) AS walks_completed
            FROM users
            JOIN WalkApplications ON WalkApplications.walker_id = Users.user_id
            JOIN WalkRequests ON WalkRequests.request_id = WalkApplications.request_id
            WHERE role = 'walker' AND WalkRequests.status = 'completed' AND WalkApplications.status = 'accepted'
            GROUP `);
            res.json(rows);
    } catch {
        res.json({Error: 'couldnt fetch walkrequests route' })
    }
});

