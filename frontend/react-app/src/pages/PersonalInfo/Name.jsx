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

    function PreviewImage() {
        var oFReader = new FileReader();
        oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

        oFReader.onload = function (oFREvent) {
            document.getElementById("uploadPreview").src = oFREvent.target.result;
        };
    };



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
                <img id="Profile-Pic" src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-768x576.png"></img>
                {/* <input type="file" accept="image/*" onChange="" /> */}
                <input id="uploadImage" type="file" name="myPhoto" onchange={PreviewImage} />

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