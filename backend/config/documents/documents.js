const bcrypt = require(`bcrypt`);

const User = require(`../../models/userModel`);
const Comment = require(`../../models/commentModel`);
const EmergencyContact = require(`../../models/emergencyContactModel`);
const Housing = require(`../../models/housingModel`);



const documents = async (housingId,) => {
  const hr1 = await User.create({
    house: housingId,
    firstName: `Sunny`,
    lastName: `Li`,
    email: `sunnyli@gmail.com`,
    ssn: `123456789`,
    dob: new Date(`2000-01-01`),
    gender: `female`,
    address: {
      street: `123 Shinchan Ave`,
      city: `Oklahoma City`,
      state: `Oklahoma`,
      zip: `12345`,
    },
    phone: {
      cell: `9171231234`,
    },
    visa: {
      // Does citizen count as visa title?
      visaTitle: `Citizen`,
      startDate: new Date(`2000-01-01`),
      // if so endDate should be optional
      endDate: new Date(),
    },
    emergencyContact: [
      await EmergencyContact.create({
        firstName: `Crayon`,
        lastName: `ShinChan`,
        phone: {
          cell: `3214442345`,
        },
        email: `sunnyscontact@gmail.com`,
        relationship: `Bestie`,
      }),
    ],
    username: `sunnyli`,
    password: await bcrypt.hash(`sunnyPW`, Number(process.env.SALT)),
    isHR: true,
    workAuthorization: `citizen`,
    workAuthorizationStart: new Date(`2000-01-01`),
    workAuthorizationEnd: new Date(`2000-01-01`),
    housingReport:[ {
      title: "test",
      description: "some compliant",
      housingComments: [],
      status: "In Progress",
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "AnyState",
        zip: "12345",
      },
    } ],
  });
};

module.exports = documents;
