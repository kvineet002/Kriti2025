const express = require('express');
const { addDeployedWebsite, getDeployedWebsites, checkDeployed } = require('../controllers/deployedController');
const router = express.Router();

router.post('/add',addDeployedWebsite);
router.get('/get/:email',getDeployedWebsites);
router.post('/check/:email',checkDeployed);

module.exports = router;