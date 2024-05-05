const User = require("../models/userModel");
const Housing = require("../models/housingModel");
const HousingReport = require("../models/housingReportModel");


const EmergencyContact = require("../models/emergencyContactModel");

// hard coded to one user
// wait for the token, add it to the middlewear
async function GetAllHousingInfo(req, res){
    // let userid = //get this from the token middlwear... don't worry for now

    try {
        let all = await Housing.find()
        .populate("roommates")
        .populate("housingReport");

        // console.log(JSON.stringify(all));

        if (!all) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(all);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });

    }
}

module.exports = GetAllHousingInfo