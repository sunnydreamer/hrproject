import React, { useState } from 'react';
import './styles.css';
import axios from 'axios';

function Address({ data, setData }) {
    const [editMode, setEditMode] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            address: {
                ...prevData.address,
                [name]: value
            }
        }));
    }

    function handleSubmit() {
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

    function handleSave() {
        handleSubmit();
        setEditMode(false);
    }

    function toggleEditMode() {
        setEditMode(prevMode => !prevMode);
    }

    return (
        <div>


            <div className="Address-Div-Hr">
                <div className="Address-Div-One">
                    <label htmlFor="StreetName">Street Name:</label>
                    <input
                        type="text"
                        id="StreetName"
                        name="street"
                        value={data.address.street || ''}
                        onChange={handleChange}
                        readOnly={!editMode}
                    />
                    <label htmlFor="BuildingApt">Building/Apt #:</label>
                    <input
                        type="text"
                        id="BuildingApt"
                        name="streetLine2"
                        value={data.address.streetLine2 || ''}
                        onChange={handleChange}
                        readOnly={!editMode}
                    />
                </div>
                <div className="Address-Div-Two">
                    <label htmlFor="City">City:</label>
                    <input
                        type="text"
                        id="City"
                        name="city"
                        value={data.address.city || ''}
                        onChange={handleChange}
                        readOnly={!editMode}
                    />
                    <label htmlFor="State">State:</label>
                    <input
                        type="text"
                        id="State"
                        name="state"
                        value={data.address.state || ''}
                        onChange={handleChange}
                        readOnly={!editMode}
                    />
                    <label htmlFor="Zip">Zip:</label>
                    <input
                        type="text"
                        id="Zip"
                        name="zip"
                        value={data.address.zip || ''}
                        onChange={handleChange}
                        readOnly={!editMode}
                    />
                </div>
            </div>
        </div>
    );
}

export default Address;