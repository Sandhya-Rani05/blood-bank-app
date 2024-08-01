const express = require('express');
const { createInventoryController, getInventoryController, getDonarsController, getHospitalController, getOrganisationController, getOrganisationForHospitalController, getInventoryHospitalController, getRecentInventoryController } = require('../controllers/inventoryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//routes
//ADD inventory || POST
router.post('/create-inventory', authMiddleware, createInventoryController);

//Get all blood records
router.get('/get-inventory', authMiddleware, getInventoryController);

//get recent inventories
router.get('/get-recent-inventory', authMiddleware, getRecentInventoryController);

//Get hospital blood records
router.get('/get-inventory-hospital', authMiddleware, getInventoryHospitalController);

//Get all donar records
router.get('/get-donars', authMiddleware, getDonarsController);

//Get all hospital records
router.get('/get-hospitals', authMiddleware, getHospitalController);

//Get all org records
router.get('/get-organisation', authMiddleware, getOrganisationController);

//Get all org records for hospitals
router.get('/get-organisation-for-hospital', authMiddleware, getOrganisationForHospitalController);

module.exports = router;