// import React, { useEffect, useState } from 'react';
// import Name from './Name'
// import Address from './Address'
// import Contact from './Contact';
// import Documents from './Documents';
// import EmergencyContact from './EmergencyContact';
// import Employment from './Employment';
// import axios from 'axios';



// const PersonalInfoPage = () => {

//   // Name grab first, last, middle, preffered, email, ssn, dob gender
//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     middleName: "",
//     preferredName: "",
//     email: "",
//     ssn: "",
//     dob: "",
//     gender: "",
//     address: {
//       city: "",
//       state: "",
//       address: "",
//       addressLine2: "",
//       zip: ""
//     },
//     workAuthorization: "",
//     workAuthorizationStart: "",
//     workAuthorizationEnd: "",
//     visa: {
//       startDate: "",
//       endDate: "",
//       visaTitle: ""
//     },
//     phone: {
//       work: "",
//       cell: ""
//     },
//     emergencyContact: [],
//     //documents go here 
//     //work auth pdf
//     driversLicense: "",
//     profilePicture: "",
//     opt: []
//   })




//   //maybe pass in the userid... or maybe not... it should be in cookie
//   useEffect(() => {
//     axios.get("http://localhost:3000/user/personalinfo",{
//       withCredentials: true
//     })
//       .then(response => {
//         setData(response.data)
//         console.log(response.data)
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, [])
//   return (
//     <div id="parent-personal">
//       {data ? (
//         <>
//           <Name data={data} setData={setData}></Name>
//           <Address data={data} setData={setData}></Address>
//           <Contact data={data} setData={setData}></Contact>
//           <Employment data={data} setData={setData}></Employment>
//           <EmergencyContact data={data} setData={setData}></EmergencyContact>
//           <Documents data={data} setData={setData}></Documents>
//         </>)
//         : null}
//       </div>

//   );
// }

// export default PersonalInfoPage;


import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Name from './Name';
import Address from './Address';
import Contact from './Contact';
import Documents from './Documents';
import EmergencyContact from './EmergencyContact';
import Employment from './Employment';
import axios from 'axios';
import './styles.css';


const PersonalInfoPage = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    preferredName: "",
    email: "",
    ssn: "",
    dob: "",
    gender: "",
    address: {
      city: "",
      state: "",
      address: "",
      addressLine2: "",
      zip: ""
    },
    workAuthorization: "",
    workAuthorizationStart: "",
    workAuthorizationEnd: "",
    visa: {
      startDate: "",
      endDate: "",
      visaTitle: ""
    },
    phone: {
      work: "",
      cell: ""
    },
    emergencyContact: [],
    driversLicense: "",
    profilePicture: "",
    opt: []
  });

  useEffect(() => {
    axios.get("http://localhost:3000/user/personalinfo", {
      withCredentials: true
    })
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Container maxWidth="md">
      {data ? (
        <>
          <Name data={data} setData={setData} />
          <Address data={data} setData={setData} />
          <Contact data={data} setData={setData} />
          <Employment data={data} setData={setData} />
          <EmergencyContact data={data} setData={setData} />
          <Documents data={data} setData={setData} />
        </>
      ) : null}
    </Container>
  );
};

export default PersonalInfoPage;
