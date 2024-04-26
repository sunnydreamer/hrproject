const User = require(`../../models/userModel`);
const Comment = require(`../../models/commentModel`);
const EmergencyContact = require(`../../models/emergencyContactModel`);
const Housing = require(`../../models/housingModel`);

const documents = async () => {
  const hr1 = await User.create({
    firstName: `Sunny`,
    lastName: `Li`
  })
};

module.exports = documents;
