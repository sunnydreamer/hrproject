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
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/fetchUserData";



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

  const dispatch = useDispatch();
  const dataRedux = useSelector((state) => state.payload);


  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
        setData(dataRedux);
  }, [dataRedux]); 

  // useEffect(() => {
  //   axios.get("http://localhost:3000/user/personalinfo", {
  //     withCredentials: true
  //   })
  //     .then(response => {
  //       setData(response.data);
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  return (
<Container sx={{ maxWidth: '50vw', margin: '0', padding: '0' }}>
      {data ? (
        <>
        <h2>Basic Info</h2>
          <Name data={data} setData={setData} />
          <h2>Address Info</h2>
          <Address data={data} setData={setData} />
          <h2>Contact Info</h2>
          <Contact data={data} setData={setData} />
          <h2>Employment Info</h2>
          <Employment data={data} setData={setData} />
          <h2>Emergency Info</h2>
          <EmergencyContact data={data} setData={setData} />
          <h2>Documents</h2>
          <Documents data={data} setData={setData} />
        </>
      ) : null}
    </Container>
  );
};

export default PersonalInfoPage;
