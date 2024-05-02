// const User = require("../models/userModel");
const Housing = require("../models/housingModel");
// const HousingReport = require("../models/housingReportModel");

const User = require("../models/userModel");
const HousingReport = require("../models/housingReportModel")
const mongoose = require('mongoose');




// hard coded to one user
// wait for the token, add it to the middlewear
async function PutHousingReport(req, res){
    // let userid = //get this from the token middlwear... don't worry for now

    // console.log(req.body);
    const {title, description, houseId, userId} = req.body;

    // console.log(req.body)

    //now we got it... now let's create new report
    const newHouseReport = await HousingReport.create(
        {
          title: title,
          description: description,
          createdBy: userId,
          status: "Open",
          timestamp: new Date(),
          housingComments: []
      });

      //how go do the housingID and 

      const house = await Housing.findById(houseId);

      house.housingReport.push(newHouseReport);
      house.save()

      console.log(house);







    res.status(200).json({hi: "adsffdsfsd"});
}

module.exports = PutHousingReport