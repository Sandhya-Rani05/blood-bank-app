const inventoryModel = require("../models/inventoryModel");
const mongoose = require("mongoose");

//Get blood data
const bloodGroupDetails = async (req, res) => {
    try {
        const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
        const bloodGroupData = [];
        const organisation = new mongoose.Types.ObjectId(req.body.userId);
        //get single blood group
        await Promise.all(bloodGroups.map(async (bloodGroup) => {
            //count total in
            const totalIn = await inventoryModel.aggregate([
                {
                    $match: {
                        bloodGroup: bloodGroup,
                        inventoryType: "in",
                        organisation
                    },
                },
                {
                    $group: {
                        _id: null, total: { $sum: "$quantity" }
                    },
                },
            ]);
            //count total out
            const totalOut = await inventoryModel.aggregate([
                {
                    $match: {
                        bloodGroup: bloodGroup,
                        inventoryType: "out",
                        organisation
                    },
                },
                {
                    $group: {
                        _id: null, total: { $sum: "$quantity" }
                    },
                },
            ]);
            //calc total
            const availableBlood = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

            //push data
            bloodGroupData.push({
                bloodGroup,
                totalIn: totalIn[0]?.total || 0,
                totalOut: totalOut[0]?.total || 0,
                availableBlood
            })
        }))
        return res.status(200).send({
            success: true,
            message: "Blood Group data fetched successfully",
            bloodGroupData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in bloodGroup data analytics API",
            error,
        })
    }
}

module.exports = { bloodGroupDetails };