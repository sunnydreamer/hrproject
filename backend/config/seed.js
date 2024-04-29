const mongoose = require(`mongoose`);
const documents = require(`./documents/documents`);
const User = require(`../models/userModel`);
const Comment = require(`../models/commentModel`);
const EmergencyContact = require(`../models/emergencyContactModel`);
const Housing = require(`../models/housingModel`);
const Document = require("../models/documentModel");
require(`dotenv`).config({ path: __dirname + `/./../.envBackend` });

const seed = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);

    console.log(`clearing collection data`);
    await User.deleteMany({});
    await Comment.deleteMany({});
    await EmergencyContact.deleteMany({});
    await Housing.deleteMany({});
    await Document.deleteMany({});
    console.log(`old data cleared`);

    console.log(`seeding database`);
    await documents();
    console.log(`database seeded`);
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.connection.close();
  }
};

seed();
