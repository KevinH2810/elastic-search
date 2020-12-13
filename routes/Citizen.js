const express = require('express');
const { citizenController } = require('../controller');

const router = express.Router();

router.get('/', (req, res) => {
    citizenController.GetCitizen(req, res)
});

router.post('/', (req, res) => {
    citizenController.AddCitizen(req, res)
});

router.delete('/', (req, res) => {
    citizenController.DeleteCitizen(req, res)
});

router.put('/', (req, res) => {
    citizenController.UpdateCitizen(req, res)
});


module.exports = router;