const User = require("../models/userModel");
const EmergencyContact = require("../models/emergencyContactModel");


// hard coded to one user
// wait for the token, add it to the middlewear
async function PostUserContact(req, res){
    // let userid = //get this from the token middlwear... don't worry for now

        const {userId, email} = req.body;

        console.log(userId, email)

        //grab the req payload
        let payload = req.body;
        // console.log(payload)

        // //grab the curruser
        let CurrUser = await User.findOne({ _id: userId });
        let newEmergency = new EmergencyContact({
            ... payload.newContact
            });
        
        let newj = await newEmergency.save();
        CurrUser.emergencyContact.push(newj._id)
        await CurrUser.save();
}

module.exports = PostUserContact