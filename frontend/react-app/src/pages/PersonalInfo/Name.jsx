import React, { useState } from 'react'
import './styles.css'
import axios from 'axios';

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
        // console.log(JSON.stringify(data))
        // alert(data.profilePicture);


        axios.post('http://localhost:3000/user/info', data)
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

    return(
        <div>
            <div className="buttons">
                {edit ? (
                    <button onClick={toggleEditMode}>Edit</button>
                ) : (
                    <button onClick={handleSave}>Save</button>
                )}
            </div>

            
            <div className="Name-Div">
                <div className="Name-Div-Row">

                {data.profilePicture ? (<img id="Profile-Pic" src={data.profilePicture} ></img>)
                            : 
                            (<img id="Profile-Pic" src={profilePic} alt=""></img>)
                            }

                {/* <input type="file" accept="image/*" onChange="" /> */}
                <input id="uploadImage" type="file" name="myPhoto" onChange={changeImg} style={{ display: edit ? 'none' : 'block' }}/>

                </div>

                <div className="Name-Div-Row">
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                        <input onChange={handleChange} readOnly={edit} type="text" id="firstName" name="firstName" value={data.firstName}></input>
                    </div>
                    <div>

                        <label htmlFor="lastName">Last Name:</label>
                        <input onChange={handleChange} readOnly={edit} type="text" id="lastName" name="lastName" value={data.lastName}></input>
                    </div>
                    <div>
                        <label htmlFor="middleName">Middle Name:</label>
                        <input onChange={handleChange} readOnly={edit} type="text" id="middleName" name="middleName" value={data.middleName}></input>
                    </div>
                    <div>
                        <label htmlFor="preferredName">Preferred Name:</label>
                        <input onChange={handleChange} readOnly={edit} type="text" id="preferredName" name="preferredName" value={data.preferredName}></input>
                    </div>
                </div>

                <div className="Name-Div-Row">
                    {/* email, ssn, dob, gender */}
                    <div>

                        <label htmlFor="email">Email:</label>
                        <input onChange={handleChange} readOnly={edit} type="email" id="email" name="email" value={data.email}/>

                    </div>
                    <div>
                        <label htmlFor="ssn">SSN:</label>
                        <input onChange={handleChange} readOnly={edit} type="text" id="ssn" name="ssn" value={data.ssn}/>
                    </div>
                    
                    <div>

                        <label htmlFor="dob">Date of Birth:</label>
                        <input onChange={handleChange} readOnly={edit} type="date" id="dob" name="dob" value={data.dob}/>
                    </div>
                    <div>

                            <label htmlFor="gender">Gender:</label>
                            <select onChange={handleChange} readOnly={edit} id="gender" name="gender" value={data.gender}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                    </div>    
                </div>
            </div>
        </div>
    )

}

export default Name