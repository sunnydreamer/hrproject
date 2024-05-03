import React, { useState } from 'react'
import './styles.css'


function Name({data}){
    const edit = true;


    return data? 
    (
        <div>
            <div className="Name-Div">
                <div className="Name-Div-Row">

                {<img id="Profile-Pic" src={data.profilePicture} ></img>}
                <input id="uploadImage" type="file" name="myPhoto"/>

                </div>

                <div className="Name-Div-Row">
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                        <input  readOnly={edit} type="text" id="firstName" name="firstName" value={data.firstName}></input>
                    </div>
                    <div>

                        <label htmlFor="lastName">Last Name:</label>
                        <input readOnly={edit} type="text" id="lastName" name="lastName" value={data.lastName}></input>
                    </div>
                    <div>
                        <label htmlFor="middleName">Middle Name:</label>
                        <input  readOnly={edit} type="text" id="middleName" name="middleName" value={data.middleName}></input>
                    </div>
                    <div>
                        <label htmlFor="preferredName">Preferred Name:</label>
                        <input readOnly={edit} type="text" id="preferredName" name="preferredName" value={data.preferredName}></input>
                    </div>
                </div>

                <div className="Name-Div-Row">
                    <div>

                        <label htmlFor="email">Email:</label>
                        <input  readOnly={edit} type="email" id="email" name="email" value={data.email}/>

                    </div>
                    <div>
                        <label htmlFor="ssn">SSN:</label>
                        <input  readOnly={edit} type="text" id="ssn" name="ssn" value={data.ssn}/>
                    </div>
                    
                    <div>

                        <label htmlFor="dob">Date of Birth:</label>
                        <input  readOnly={edit} type="date" id="dob" name="dob" value={data.dob}/>
                    </div>
                    <div>

                            <label htmlFor="gender">Gender:</label>
                            <select readOnly={edit} id="gender" name="gender" value={data.gender}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                    </div>    
                </div>
            </div>
        </div>
    )

    :
     (
        <h2>Undefined</h2>
    )

}

export default Name