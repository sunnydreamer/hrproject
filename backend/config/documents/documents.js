const bcrypt = require(`bcrypt`);

const User = require(`../../models/userModel`);
const Comment = require(`../../models/commentModel`);
const EmergencyContact = require(`../../models/emergencyContactModel`);
const Housing = require(`../../models/housingModel`);

const documents = async () => {
  const hr1 = await User.create({
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
    isHR: true,
    workAuthorization: `green card`,
    roommates: [
      {
        name: `Yineng Zhang`,
      },
    ],
  });
  e1.visa = { visaTitle: `haha` };
  await e1.save()

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
    isHR: true,
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
    isHR: true,
    workAuthorization: `F1`,
    opt: {
      receipt: ``,
      ead: ``,
      i983: ``,
    },
  });
};

module.exports = documents;
