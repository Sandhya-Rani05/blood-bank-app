const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getDonarsListController, getHospitalListController, getOrgListController, deleteDonarController } = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

//router object
const router = express.Router();

//routes

//GET || DonerLIst
router.get(
    "/donar-list",
    authMiddleware,
    adminMiddleware,
    getDonarsListController
);

//GET || HospitalList
router.get(
    "/hospital-list",
    authMiddleware,
    adminMiddleware,
    getHospitalListController
);

//GET || Org list
router.get(
    "/org-list",
    authMiddleware,
    adminMiddleware,
    getOrgListController
);

//delete donar || GET
router.delete("/delete-donar/:id", authMiddleware, adminMiddleware, deleteDonarController);

//export
module.exports = router;
