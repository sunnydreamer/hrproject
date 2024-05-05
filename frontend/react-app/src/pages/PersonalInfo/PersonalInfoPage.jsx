import React, { useEffect, useState } from 'react';
import Name from './Name'
import Address from './Address'
import Contact from './Contact';
import Documents from './Documents';
import EmergencyContact from './EmergencyContact';
import Employment from './Employment';
import axios from 'axios';



const PersonalInfoPage = () => {

  // Name grab first, last, middle, preffered, email, ssn, dob gender
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
    //documents go here 
    //work auth pdf
    driversLicense: "",
    profilePicture: "",
    opt: []
  })




  //maybe pass in the userid... or maybe not... it should be in cookie
  useEffect(() => {
    axios.get("http://localhost:3000/user/personalinfo")
      .then(response => {


        //set the first part
        // let initData ={
        //   firstName: response.data.firstName,
        //   lastName: response.data.lastName,
        //   middleName: response.data.middleName,
        //   preferredName: response.data.preferredName,
        //   email: response.data.email,
        //   ssn: response.data.ssn,
        //   dob: response.data.dob,
        //   gender: response.data.gender,
        //   address: response.data.address,
        //   visa: response.data.visa,
        //   workAuthorization: response.data.workAuthorization,
        //   workAuthorizationStart: response.data.workAuthorizationStart,
        //   workAuthorizationEnd: response.data.workAuthorizationEnd,
        //   phone: response.data.phone,
        //   emergencyContact:  response.data.emergencyContact,
        //   //documents go here 
        //   //work auth pdf
        //   driversLicense: response.data.driversLicense,
        //   profilePicture: response.data.profilePicture
        // }
        // setData(initData);
        // console.log(initData.emergencyContact);

        setData(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [])




  return (

    <div id="parent-personal">

      {data ? (
        <>
          <Name data={data} setData={setData}></Name>
          <Address data={data} setData={setData}></Address>
          <Contact data={data} setData={setData}></Contact>
          <Employment data={data} setData={setData}></Employment>
          <EmergencyContact data={data} setData={setData}></EmergencyContact>
          <Documents data={data} setData={setData}></Documents>
        </>)
        : null}
    </div>

  );
}

export default PersonalInfoPage;
