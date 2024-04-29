const User = require("../models/userModel");
const EmergencyContact = require("../models/emergencyContactModel");


// hard coded to one user
// wait for the token, add it to the middlewear
async function PostUserContact(req, res){
    // let userid = //get this from the token middlwear... don't worry for now


        //grab the req payload
        let payload = req.body;
        // console.log(payload.newContact)

        //grab the curruser
        let CurrUser = await User.findOne({ firstName: req.body.username });
    console.log(CurrUser, req.body)

        let newEmergency = new EmergencyContact({
            ... payload.newContact
            });
        
        let newj = await newEmergency.save();

        CurrUser.emergencyContact.push(newj._id)
        await CurrUser.save();

}

module.exports = PostUserContact