import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Name from './Name'
import Address from './Address'
import Contact from './Contact';
import Documents from './Documents';
import EmergencyContact from './EmergencyContact';
import Employment from './Employment';
import axios from 'axios';

import NavBar from "../../components/NavBar";
import Header from "../../components/Header";



const HRPersonalInfoPage = () => {
  let { id } = useParams();


  // Name grab first, last, middle, preffered, email, ssn, dob gender
  const [data, setData] = useState()


  useEffect(() => {
    axios.get(`http://localhost:3000/user/hr/userprofiles/${id}`)
      .then(response => {
        setData(response.data[0]);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [id]);  




  return (
      <div className='personal'>

        <div className="flex-col full-parent-width">
          <Header title="Personal Info" />
        </div>

      {data? (
        <>
        <h2>Basic Info</h2>
      <Name data={data}></Name>
      <h2>Address Info</h2>

      <Address data={data} setData={setData}></Address>
      <h2>Contact Info</h2>

      <Contact data={data} setData={setData}></Contact>
      <h2>Employment Info</h2>

      <Employment data={data} setData={setData}></Employment>
      <h2>Emergency Contact</h2>

      <EmergencyContact data={data} setData={setData}></EmergencyContact>
      {/* <Documents data={data} setData={setData}></Documents> */}
       </>) 
      : null }
    </div>

  );
}

export default HRPersonalInfoPage;
