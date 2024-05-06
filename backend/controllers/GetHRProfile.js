const User = require("../models/userModel");



// hard coded to one user
// wait for the token, add it to the middlewear
async function GetHRProfile(req, res){
    // let userid = //get this from the token middlwear... don't worry for now
    const id = req.params.id;

    try {
        let CurrUser = id? await User.find({_id: id }).populate(
            "emergencyContact"
          ) . populate("opt")
        
                        :
                        await User.find();

        if (!CurrUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(CurrUser);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = GetHRProfile