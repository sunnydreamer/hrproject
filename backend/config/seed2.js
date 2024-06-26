const mongoose = require(`mongoose`);
const documents = require(`./documents/documents2`);
const User = require(`../models/userModel`);
const Comment = require(`../models/commentModel`);
const EmergencyContact = require(`../models/emergencyContactModel`);
const Housing = require(`../models/housingModel`);
const HousingReport = require(`../models/housingReportModel`);


const Document = require("../models/documentModel");
require(`dotenv`).config({ path: __dirname + `/./../.envBackend` });

const seed = async () => {
  try {
    console.log(MONGO_URI);
    mongoose.connect(MONGO_URI);

    console.log(`clearing collection data`);
    await User.deleteMany({});
    await Comment.deleteMany({});
    await EmergencyContact.deleteMany({});
    await Housing.deleteMany({});
    await Document.deleteMany({});
    await HousingReport.deleteMany({});

    console.log(`old data cleared`);

    console.log(`seeding database`);
    //seed housing
    // let id = await seedHousing();
    //give sunny the housing id

    await documents();
    // Save the new document to the database
    console.log("Seed successful!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
}

seed();
