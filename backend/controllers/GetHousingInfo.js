const User = require("../models/userModel");
const Housing = require("../models/housingModel");
const HousingReport = require("../models/housingReportModel");


const EmergencyContact = require("../models/emergencyContactModel");

// hard coded to one user
// wait for the token, add it to the middlewear
async function GetHousingInfo(req, res){
    // let userid = //get this from the token middlwear... don't worry for now

    try {
        let CurrUser = await User.findOne({ firstName: 'Sunny' })

                            .populate({
                                path: 'house',
                                populate: [
                                    { path: 'roommates'},
                                    { path: 'housingReport' } // Populate housingReport for the house
                                ]
                            });



        console.log(JSON.stringify(CurrUser.house));

        if (!CurrUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(CurrUser);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });

    }
}

module.exports = GetHousingInfo