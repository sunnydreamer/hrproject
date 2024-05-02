const User = require("../models/userModel");

const EmergencyContact = require("../models/emergencyContactModel");

// hard coded to one user
// wait for the token, add it to the middlewear
async function GetUserInfo(req, res) {
  // let userid = //get this from the token middlwear... don't worry for now

  try {
    let CurrUser = await User.findOne({ firstName: "Sunny" }).populate(
      "emergencyContact"
    );
    // .populate('EmergencyContact')
    // .exec((err, user) => {
    //     if (err) {
    //         console.error('Error:', err);
    //         return;
    // }})
    console.log("User with populated address:", CurrUser);

    if (!CurrUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // console.log(CurrUser)
    // console.log(CurrUser);
    res.status(200).json(CurrUser);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}



module.exports = GetUserInfo;
