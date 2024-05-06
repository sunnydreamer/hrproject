import React, { useState } from 'react'
import './styles.css'
import axios from 'axios';
import formatDate from './util';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { Button, TextField, Grid, Avatar, Typography, MenuItem, Input, Container, InputLabel} from '@mui/material';


// check the dob

function Name({data, setData}){

    const [edit, setEdit]= useState(true );  

    function handleChange(event){
        setData((prev) => {
            return { ...prev, [event.target.name]: event.target.value };
          });
    }

    //push it to the server
    function handleSubmit(){
        axios.post('http://localhost:3000/user/info', data, {
            withCredentials: true
          })
        .then(response => {
            // Handle successful response
            console.log('Response:', response.data);
          })
          .catch(error => {
            // Handle error
            console.error('Error:', error);
          });
    }

    //have some UI indication
    function handleSave() {
        handleSubmit();
        setEdit(true);
    }

    function toggleEditMode() {
        setEdit(prevMode => !prevMode);
    }


    const profilePic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC'




function changeImg(event) {
    const file = event.target.files[0]; // Get the selected file
    const reader = new FileReader(); // Create a new FileReader

    // Define an onload event handler for the FileReader
    reader.onload = async() => {
        // Access the Base64 encoded string representation of the image and update state
        const img = reader.result;
        // Pass it to handlechange
        await setData((prev) => {
            return { ...prev, profilePicture: img };
        });
    };

    // Read the selected file as a Data URL (Base64 encoded string)
    reader.readAsDataURL(file);
}



// function changeImg(event){
//         const file = event.target.files[0]; 
//         const reader = new FileReader(); // Create a new FileReader

//         // Define an onload event handler for the FileReader
//         reader.onload = async () => {
//             // Access the Base64 encoded string representation of the image and update state
//             const img = reader.result;
//                   //pass it to handlechange
//             await setData((prev) => {
//                 return { ...prev, profilePicture: img };
//             });
//             // handleSubmit();
//             // handleSave();
//             alert(data.profilePicture);

//         };
//         handleSave();
//         // Read the selected file as a Data URL (Base64 encoded string)
//         reader.readAsDataURL(file);
//     }



return (
    <div className='personal'>
      <div className="buttons">
        {edit ? (
          <Button onClick={toggleEditMode}>Edit</Button>
        ) : (
          <Button onClick={handleSave}>Save</Button>
        )}
      </div>

      <div className="Name-Div">
        <div className="Name-Div-Row">
          {data.profilePicture ? (
            <img id="Profile-Pic" src={data.profilePicture} alt="" />
          ) : (
            <img id="Profile-Pic" src={profilePic} alt="" />
          )}
          <Input
            id="uploadImage"
            type="file"
            name="myPhoto"
            onChange={changeImg}
            style={{ display: edit ? 'none' : 'block' }}
          />
        </div>

        <div className="Name-Div-Row">
          <TextField
            onChange={handleChange}
            readOnly={edit}
            label="First Name:"
            variant="outlined"
            type="text"
            id="firstName"
            name="firstName"
            value={data.firstName}
          />
          <TextField
            onChange={handleChange}
            readOnly={edit}
            label="Last Name:"
            variant="outlined"
            type="text"
            id="lastName"
            name="lastName"
            value={data.lastName}
          />
          <TextField
            onChange={handleChange}
            readOnly={edit}
            label="Middle Name:"
            variant="outlined"
            type="text"
            id="middleName"
            name="middleName"
            value={data.middleName}
          />
          <TextField
            onChange={handleChange}
            readOnly={edit}
            label="Preferred Name:"
            variant="outlined"
            type="text"
            id="preferredName"
            name="preferredName"
            value={data.preferredName}
          />
        </div>

        <div className="Name-Div-Row">
          <TextField
            onChange={handleChange}
            readOnly={edit}
            label="Email:"
            variant="outlined"
            type="email"
            id="email"
            name="email"
            value={data.email}
          />
          <TextField
            onChange={handleChange}
            readOnly={edit}
            label="SSN:"
            variant="outlined"
            type="text"
            id="ssn"
            name="ssn"
            value={data.ssn}
          />
          <TextField
            onChange={handleChange}
            readOnly={edit}
            label="Date of Birth:"
            variant="outlined"
            type="date"
            id="dob"
            name="dob"
            value={formatDate(data.dob)}
          />
          <TextField
            select
            onChange={handleChange}
            readOnly={edit}
            label="Gender:"
            variant="outlined"
            id="gender"
            name="gender"
            value={data.gender}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
        </div>
      </div>
    </div>
  );
}


export default Name