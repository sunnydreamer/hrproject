import React, { useState } from 'react';
import './styles.css'
import axios from 'axios';


function EmergencyContact({data, setData}){

    const edit = false;

    const contacts = data.emergencyContact;



    return(
        <div>



    <div className="Emergency-Hr">

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
                                    readOnly={!edit}
                                />
                            </td>

                             <td>
                                <input
                                    type="text"
                                    value={contact.lastName}
                                    readOnly={!edit}
                                    />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={contact.middleName}
                                    readOnly={!edit}
                                    />
                            </td>
                            <td>
                            <input
                                type="text"
                                value={contact.phone?.cell == undefined ? "": contact.phone.cell}
                                readOnly={!edit}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={contact.email}

                                    readOnly={!edit}
                                    />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={contact.relationship}
                                    readOnly={!edit}
                                    />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
        </div>
    )


}

export default EmergencyContact