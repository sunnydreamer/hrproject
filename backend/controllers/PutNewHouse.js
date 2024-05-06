// const User = require("../models/userModel");
const Housing = require("../models/housingModel");
// const HousingReport = require("../models/housingReportModel");

const User = require("../models/userModel");
const HousingReport = require("../models/housingReportModel")
const mongoose = require('mongoose');




// hard coded to one user
// wait for the token, add it to the middlewear
async function PutNewHouse(req, res){
    // let userid = //get this from the token middlwear... don't worry for now

    // console.log(req.body);
    // const {title, description, houseId, userId} = req.body;

    const {street, streetLine2, city, state, zip, landlordName, landlordPhone, landlordEmail, beds, mattresses, tables, chairs}= req.body;

    if (!street || !city || !state || !zip || !landlordName || !landlordPhone || !landlordEmail || !beds || !mattresses || !tables || !chairs) {
        // At least one of the required fields is empty
        res.status(400).json({ error: 'One or more required fields are empty' });
        return; // Exit the function early
    }


    // cool now create it

    console.log(req.body.street, "=====")

    const unpackedHouse = {
        address: {
          street: street,
          streetLine2: streetLine2,
          city: city,
          state: state,
          zip: zip,
        },
        roommates: [],
        housingReport: [],
        landlord: {
            fullName: landlordName,
            phone: landlordPhone,
            email: landlordEmail,
        },
        tables: tables,
        chairs: chairs,
        beds: beds,
        mattresses: mattresses
      };

      console.log(unpackedHouse);

    const h1 = await Housing.create(unpackedHouse);

    //   console.log(h1)


    res.status(200).json({message: "okay"});
}

module.exports = PutNewHouse;