const userModel = require("../models/userModel");

//get donar list
const getDonarsListController = async (req, res) => {
    try {
        const donarData = await userModel
            .find({ role: "donar" })
            .sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            Totalcount: donarData.length,
            message: "Donar list fetched successfully",
            donarData,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in donar lsit API",
            error,
        });
    }
};


//get hospital list
const getHospitalListController = async (req, res) => {
    try {
        const hospitalData = await userModel
            .find({ role: "hospital" })
            .sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            Totalcount: hospitalData.length,
            message: "Hospital list fetched successfully",
            hospitalData,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in hospital list API",
            error,
        });
    }
};

//get org list
const getOrgListController = async (req, res) => {
    try {
        const orgData = await userModel
            .find({ role: "organisation" })
            .sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            Totalcount: orgData.length,
            message: "Organisation list fetched successfully",
            orgData,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Organisation list API",
            error,
        });
    }
};

//Delete donar
const deleteDonarController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success: true,
            message: " Record deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while deleting ",
            error
        })
    }
};


//export
module.exports = { getDonarsListController, getHospitalListController, getOrgListController, deleteDonarController };
