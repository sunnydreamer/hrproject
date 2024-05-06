const User = require("../models/userModel");
const EmergencyContact = require("../models/emergencyContactModel");


// hard coded to one user
// wait for the token, add it to the middlewear
async function PostUserInfo(req, res){
    // let userid = //get this from the token middlwear... don't worry for now
    const {userId, email} = req.body;

    console.log(userId, "0000")


    try {
        //grab the req payload
        let payload = req.body;


        //grab the curruser
        // let CurrUser = await User.findOne({ _id: userId});

        let updatedUser = await User.findOneAndUpdate(
            { _id: userId }, // Condition to find the user UPDATE THIS WHEN THERE IS AUTHENTICATION
            payload,
            { new: true } // To return the updated document
        );

        // update emergency contacts
        let contacts = payload.emergencyContact;
        for (const contact of contacts) {
            try {
                let currContact = await EmergencyContact.findOneAndUpdate(
                    { _id: contact._id }, // Use '_id' instead of 'id'
                    { 
                        firstName: contact.firstName,
                        lastName: contact.lastName,
                        middleName: contact.middleName,
                        email: contact.email,
                        relationship: contact.relationship,
                        phone: contact.phone
                    },
                    { new: true }
                );
                console.log("Updated contact:", currContact);
            } catch (error) {
                console.error('Error updating contact:', error);
            }
        }

        if (!updatedUser) {
            
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = PostUserInfo