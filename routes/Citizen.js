const express = require('express');
const { citizenController } = require('../controller');

const router = express.Router();

router.get('/', (req, res) => {
    citizenController.getCitizen(req, res)
});

router.post('/', (req, res) => {
    citizenController.AddCitizen(req, res)
});

module.exports = router;