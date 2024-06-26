const mongoose = require(`mongoose`);
const documents = require(`./documents/documents`);
const User = require(`../models/userModel`);
const Comment = require(`../models/commentModel`);
const EmergencyContact = require(`../models/emergencyContactModel`);
const Housing = require(`../models/housingModel`);

const Document = require("../models/documentModel");
// require(`dotenv`).config({ path: __dirname + `/./../.env` });

const MONGO_URI="mongodb+srv://hrproject:hrproject@cluster0.sxrauue.mongodb.net/hrproject?retryWrites=true&w=majority&appName=Cluster0"


async function seedHousing() {
  try {
    // Create a new Housing document
    const newHousing = new Housing({
      house: {
        address: {
          street: "123 Main St",
          city: "Anytown",
          state: "AnyState",
          zip: "12345",
        },
      },
    });

    // Save the new document to the database

    return abc._id;

    console.log("Seed successful!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

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
};

seed();
