const User = require("../models/userModel");

const EmergencyContact = require("../models/emergencyContactModel");

// hard coded to one user
// wait for the token, add it to the middlewear
async function GetUserInfo(req, res) {
  // let userid = //get this from the token middlwear... don't worry for now

  const {userId, email} = req.body;


  // console.log(userId, email, req.body)
  try {
    let CurrUser = await User.findOne({ _id: userId }).populate(
      "emergencyContact"
    ) . populate("opt")
    .populate({
      path: 'opt',
      populate: [
          { path: 'receipt'},
          { path: 'ead' },
          { path: 'i983' }, 
          { path: 'i20' } 


      ]
  });


    if (!CurrUser) {
      return res.status(404).json({ message: "User not found" });
    }


    res.status(200).json(CurrUser);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const fetchUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: `6631558ef7a2a77d7f547c50` });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (errpr) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { GetUserInfo, fetchUserById };
