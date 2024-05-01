import React, { useState } from 'react';
import './styles.css'
import axios from 'axios';


function EmergencyContact({data, setData}){

    const [newContact, setNewContact] = useState({
        firstName : "",
        lastName : "",
        middleName : "",
        phone : {
            cell: "",
            work: ""
        },
        email:"",
        relationship:""
    });

    //the data is in 
    //it is an array
    const [edit, setEdit] = useState(false);

    const contacts = data.emergencyContact;
    // console.log()

    function handleInputChange(e, index, field){
        const updatedContacts = [...contacts];
        // console.log(updatedContacts[index].phone)
        if(field == "cell"){
            updatedContacts[index].phone[field] = e.target.value;
        }
        else{
            updatedContacts[index][field] = e.target.value;
        }
        setData(prevData => ({ ...prevData, emergencyContact: updatedContacts }));
    };

    function toggleEditMode(){
        setEdit(prevEdit => !prevEdit);
    };

    function handleSave ()  {
        axios.post('http://localhost:3000/user/info', data)
            .then(response => {
                // Handle successful response
                console.log('Response:', response.data);
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });
        setEdit(false); // Disable edit mode after saving
    };

    function makeNewContact(e){
        // e.preventDefault();
        //make the object
        let obj = {
            newContact,
            // change it later, for now hardcoded
            username: "Sunny"
        };
        //send it to server
        axios.post('http://localhost:3000/user/info/contact', obj)
            .then(response => {
                // Handle successful response
                console.log('Response:', response.data);
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });
        setEdit(false); // Disable edit mode after saving

        // set new contact
        setNewContact({
            firstName : "",
            lastName : "",
            middleName : "",
            phone : {
                cell: "",
                work: ""
            },
            email:"",
            relationship:""
        })

    }

    return(
        <div>

    <div className="buttons">
                {edit ? (
                    <button onClick={handleSave}>Save</button>
                ) : (
                    <button onClick={toggleEditMode}>Edit</button>
                )}
    </div>

    <div className="Emergency-Div-Parent">

        {/* here display table*/}
        <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Middle Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Relationship</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="text"
                                    value={contact.firstName}
                                    onChange={(e) => handleInputChange(e, index, 'firstName')}
                                    readOnly={!edit}
                                />
                            </td>

                             <td>
                                <input
                                    type="text"
                                    value={contact.lastName}
                                    onChange={(e) => handleInputChange(e, index, 'lastName')}
                                    readOnly={!edit}
                                    />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={contact.middleName}
                                    onChange={(e) => handleInputChange(e, index, 'middleName')}
                                    readOnly={!edit}
                                    />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={contact.phone.cell}
                                    onChange={(e) => handleInputChange(e, index, 'cell')}
                                    readOnly={!edit}
                                    />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={contact.email}
                                    onChange={(e) => handleInputChange(e, index, 'email')}
                                    readOnly={!edit}
                                    />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={contact.relationship}
                                    onChange={(e) => handleInputChange(e, index, 'relationship')}
                                    readOnly={!edit}
                                    />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>



        <form className="Create-Emergency-Div" onSubmit={makeNewContact}>
            {/* <div> */}
            {/* <label htmlFor="EmergencyFirstName">First Name:</label> */}
            <input 
                type="text" 
                id="EmergencyFirstName" 
                name="EmergencyFirstName" 
                value={newContact.firstName} 
                onChange={(e) => setNewContact((prev) => ({ ...prev, firstName: e.target.value}))}/>
            {/* </div> */}
            {/* <div> */}
            {/* <label htmlFor="EmergencyLastName">Last Name:</label> */}
            <input 
                type="text" 
                id="EmergencyLastName" 
                name="EmergencyLastName"  
                value={newContact.lastName}
                onChange={(e) => setNewContact((prev) => ({ ...prev, lastName: e.target.value}))}/>
            {/* </div> */}

            {/* <div> */}
            {/* <label htmlFor="EmergencyMiddleName">Middle Name:</label> */}
            <input 
                type="text" 
                id="EmergencyMiddleName" 
                name="EmergencyMiddleName"   
                value={newContact.middleName}
                onChange={(e) => setNewContact((prev) => ({ ...prev, middleName: e.target.value}))}/>
            {/* </div> */}

            {/* <div> */}
            {/* <label htmlFor="EmergencyPhone">Phone:</label> */}
            <input type="tel" 
                    id="EmergencyPhone" 
                    name="EmergencyPhone"  
                    value={newContact.phone.cell}
                    onChange={(e) => setNewContact((prev) => ({ ...prev, phone: { ...prev.phone, cell: e.target.value } }))}/>

            {/* </div> */}
            {/* <div> */}
            {/* <label htmlFor="EmergencyEmail">Email:</label> */}
            <input 
                type="email" 
                id="EmergencyEmail"
                 name="EmergencyEmail"  
                value={newContact.email}
                onChange={(e) => setNewContact((prev) => ({ ...prev, email: e.target.value}))}/>
            {/* </div> */}
            {/* <div> */}
            {/* <label htmlFor="EmergencyRelationship">Relationship:</label> */}
            <input 
                type="text" 
                id="EmergencyRelationship" 
                name="EmergencyRelationship"  
                value={newContact.relationship}
                onChange={(e) => setNewContact((prev) => ({ ...prev, relationship: e.target.value}))}/>
            {/* </div> */}
            <br></br>
            <button>Submit</button>
            </form>

        </div>
        </div>
    )


}

export default EmergencyContact