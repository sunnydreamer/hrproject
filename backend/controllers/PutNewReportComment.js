// const User = require("../models/userModel");
const Housing = require("../models/housingModel");
// const HousingReport = require("../models/housingReportModel");

const User = require("../models/userModel");
const HousingReport = require("../models/housingReportModel")
const mongoose = require('mongoose');

async function PutNewReportComment(req, res){
    try {

    const {userId, payload} = req.body;
    const { reportId, comment, username } = req.body;

    // console.log(reportId, userId, userId, username, comment, "88888888")
    const report = await HousingReport.findById(reportId);

    // console.log(userId, req.body);

    report.housingComments.push({
        createdBy: userId,
        username: username,
        description: comment
    })

    report.save()

    if (!report) {
      return res.status(404).json({ error: 'Housing report not found' });
    }

    res.status(200).json({ message: 'Comment added successfully' });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
}

}

module.exports = PutNewReportComment;