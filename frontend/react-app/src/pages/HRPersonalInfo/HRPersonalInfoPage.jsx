import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Name from './Name'
import Address from './Address'
import Contact from './Contact';
import Documents from './Documents';
import EmergencyContact from './EmergencyContact';
import Employment from './Employment';
import axios from 'axios';



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

    <div id="parent-personal">

      {data? (
        <>
      <Name data={data}></Name>
      {/* <Address data={data} setData={setData}></Address> */}
      {/* <Contact data={data} setData={setData}></Contact> */}
      {/* <Employment data={data} setData={setData}></Employment> */}
      {/* <EmergencyContact data={data} setData={setData}></EmergencyContact> */}
      {/* <Documents data={data} setData={setData}></Documents> */}
       </>) 
      : null }
    </div>

  );
}

export default HRPersonalInfoPage;
