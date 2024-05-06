

import React, { useState } from 'react'
import './styles.css'
import axios from 'axios';
import formatDate from './util';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { Button, TextField, Grid, Avatar, Typography, MenuItem, Input, Container, InputLabel} from '@mui/material';



function EmergencyContact({data, setData}){

   
    const [edit, setEdit] = useState(false);

    const contacts = data.emergencyContact;
    console.log(contacts, "000009999")

    function handleInputChange(e, index, field){
        const updatedContacts = [...contacts];
        if(field == "cell"){
            updatedContacts[index].phone[field] = e.target.value;
        }
        else{
            updatedContacts[index][field] = e.target.value;
        }
        setData(prevData => ({ ...prevData, emergencyContact: updatedContacts }));
    };

    function toggleEditMode(event){

        setEdit(prevEdit => !prevEdit);
    };

    function handleSave ()  {
        axios.post('http://localhost:3000/user/info', data, {
            withCredentials: true
          })
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        setEdit(false); 
    };

    function makeNewContact(e){
        let obj = {
            newContact,
            // username: "Sunny"
        };
        //send it to server
        axios.post('http://localhost:3000/user/info/contact', obj, {
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
    return (
        <div className='personal'>
            <div className="Name-Div">
                {/* Display table */}
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
                                    <TextField
                                        type="text"
                                        value={contact.firstName}
                                        onChange={(e) => handleInputChange(e, index, 'firstName')}
                                        disabled={!edit}
                                    />
                                </td>
                                <td>
                                    <TextField
                                        type="text"
                                        value={contact.lastName}
                                        onChange={(e) => handleInputChange(e, index, 'lastName')}
                                        disabled={!edit}
                                    />
                                </td>
                                <td>
                                    <TextField
                                        type="text"
                                        value={contact.middleName}
                                        onChange={(e) => handleInputChange(e, index, 'middleName')}
                                        disabled={!edit}
                                    />
                                </td>
                                <td>
                                    <TextField
                                        type="text"
                                        value={contact.phone?.cell}
                                        onChange={(e) => handleInputChange(e, index, 'cell')}
                                        disabled={!edit}
                                    />
                                </td>
                                <td>
                                    <TextField
                                        type="text"
                                        value={contact.email}
                                        onChange={(e) => handleInputChange(e, index, 'email')}
                                        disabled={!edit}
                                    />
                                </td>
                                <td>
                                    <TextField
                                        type="text"
                                        value={contact.relationship}
                                        onChange={(e) => handleInputChange(e, index, 'relationship')}
                                        disabled={!edit}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EmergencyContact