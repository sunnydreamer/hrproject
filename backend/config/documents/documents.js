const bcrypt = require(`bcrypt`);

const User = require(`../../models/userModel`);
const Comment = require(`../../models/commentModel`);
const EmergencyContact = require(`../../models/emergencyContactModel`);
const Housing = require(`../../models/housingModel`);
const Document = require(`../../models/documentModel`);



const documents = async (housingId,) => {
  const hr1 = await User.create({
    house: housingId,
    registrationLinkToken: `abc123`,
    registrationToken: `abc456`,
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

  const e1 = await User.create({
    firstName: `Maurice`,
    lastName: `Chiu`,
    email: `mauricechiu@gmail.com`,
    ssn: `987654321`,
    dob: new Date(`2006-11-21`),
    gender: `male`,
    address: {
      street: `44 Bumblebee St`,
      city: `New York`,
      state: `New York`,
      zip: `11344`,
    },
    phone: {
      cell: `6463567890`,
    },
    emergencyContact: [
      await EmergencyContact.create({
        firstName: `DongGan`,
        lastName: `ChaoRen`,
        phone: {
          cell: `8697543211`,
        },
        email: `mauricecontact@gmail.com`,
        relationship: `Guardian`,
      }),
    ],
    username: `mauricechiu`,
    password: await bcrypt.hash(`mauricePW`, Number(process.env.SALT)),
    isHR: false,
    workAuthorization: `green card`,
    roommates: [
      {
        name: `Yineng Zhang`,
      },
    ],
  });
  e1.visa = { visaTitle: `haha` };
  e1.something = { huh: `lelelel` }; // doesn't work because something isn't part of the model
  await e1.save();

  const e2 = await User.create({
    firstName: `Yineng`,
    lastName: `Zhang`,
    email: `yinengzhang@gmail.com`,
    ssn: `4567891234`,
    dob: new Date(`2002-09-10`),
    gender: `male`,
    address: {
      street: `44 Bumblebee St`,
      city: `New York`,
      state: `New York`,
      zip: `11344`,
    },
    phone: {
      cell: `3475621345`,
    },
    emergencyContact: [
      await EmergencyContact.create({
        firstName: `Bic`,
        lastName: `Boi`,
        phone: {
          cell: `1112223333`,
        },
        email: `yinengcontact@gmail.com`,
        relationship: `Brother`,
      }),
    ],
    username: `yinengzhang`,
    password: await bcrypt.hash(`yinengPW`, Number(process.env.SALT)),
    isHR: false,
    workAuthorization: `other`,
    visa: {
      visaTitle: `J-1 Scholars`,
      startDate: new Date(`2024-04-28`),
      endDate: new Date(`2024-10-28`),
    },
    roommates: [
      {
        name: `Maurice Chiu`,
      },
    ],
  });

  const e3 = await User.create({
    firstName: `Loulian`,
    lastName: `Liu`,
    email: `loulianliu@gmail.com`,
    ssn: `1873450987`,
    dob: new Date(`1989-05-18`),
    gender: `male`,
    address: {
      street: `444 Taeyang Blvd`,
      streetLine2: `Apt 3R`,
      city: `Soul`,
      state: `New York`,
      zip: `11344`,
    },
    phone: {
      cell: `9178888888`,
    },
    emergencyContact: [
      await EmergencyContact.create({
        firstName: `G`,
        lastName: `Dragon`,
        phone: {
          cell: `9119111100`,
        },
        email: `louliancontact@gmail.com`,
        relationship: `Brother`,
      }),
    ],
    username: `loulianliu`,
    password: await bcrypt.hash(`loulianPW`, Number(process.env.SALT)),
    isHR: false,
    workAuthorization: `F1`,
  });
  e3.opt.receipt = await Document.create({
    userId: e3,
    documentType: `Receipt`,
    status: `Pending`,
  });
  e3.opt.ead = await Document.create({
    userId: e3,
    documentType: `Ead`,
    status: `Pending`,
  });
  e3.opt.i983 = await Document.create({
    userId: e3,
    documentType: `I983`,
    status: `Pending`,
  });
  e3.opt.i20 = await Document.create({
    userId: e3,
    documentType: `I20`,
    status: `Pending`,
  });
  await e3.save();

  const h1 = await Housing.create({
    address: {
      street: `123 Shinchan Ave`,
      city: `Oklahoma City`,
      state: `Oklahoma`,
      zip: `12345`,
    },
    roommates: [hr1],
  });

  const h2 = await Housing.create({
    address: {
      street: `44 Bumblebee St`,
      city: `New York`,
      state: `New York`,
      zip: `11344`,
    },
    roommates: [e1, e2],
  });

  const h3 = await Housing.create({
    address: {
      street: `444 Taeyang Blvd`,
      streetLine2: `Apt 3R`,
      city: `Soul`,
      state: `New York`,
      zip: `11344`,
    },
    roommates: [e3],
  });
};

module.exports = documents;
