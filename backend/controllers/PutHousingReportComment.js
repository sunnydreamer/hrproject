// const User = require("../models/userModel");
// const Housing = require("../models/housingModel");
// const HousingReport = require("../models/housingReportModel");

const User = require("../models/userModel");
const HousingReport = require("../models/housingReportModel")
const mongoose = require('mongoose');




// hard coded to one user
// wait for the token, add it to the middlewear
async function PutHousingReportComment(req, res){

  const {housingId, comment} = req.body;
  // console.log(req.body)
  console.log(housingId)

  //for now hard coded to sunny
  const user = await User.findOne({name:"Sunny"});

  // const currHousin/g = await Housing.findById(housingId);

  try {
    const updatedHousing = await HousingReport.findById(housingId);

    updatedHousing.housingComments.push({
      createdBy: user,
      description: comment
    })

    await updatedHousing.save()


    if (!updatedHousing) {
      return res.status(404).json({ error: "Housing report not found" });
    }

    res.status(200).json({ message: "Comment updated successfully", updatedHousing });
  } catch (error) {
    console.error("Error updating housing report comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }







}

module.exports = PutHousingReportComment