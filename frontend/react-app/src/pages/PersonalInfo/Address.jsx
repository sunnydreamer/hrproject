

import React, { useState } from 'react'
import './styles.css'
import axios from 'axios';
import formatDate from './util';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { Button, TextField, Grid, Avatar, Typography, MenuItem, Input, Container, InputLabel} from '@mui/material';



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

    function handleSave() {
        handleSubmit();
        setEditMode(false);
    }

    function toggleEditMode() {
        setEditMode(prevMode => !prevMode);
    }

    return (
        <div className='personal'>
            <div className="buttons">
                {editMode ? (
                    <Button onClick={handleSave}>Save</Button>
                ) : (
                    <Button onClick={toggleEditMode}>Edit</Button>
                )}
            </div>

            <div className="Address-Div">
                <div className="Address-Div-One">
                    <TextField
                        onChange={handleChange}
                        readOnly={!editMode}
                        label="Street Name:"
                        variant="outlined"
                        type="text"
                        id="StreetName"
                        name="street"
                        value={data.address.street || ''}
                    />
                    <TextField
                        onChange={handleChange}
                        readOnly={!editMode}
                        label="Building/Apt #:"
                        variant="outlined"
                        type="text"
                        id="BuildingApt"
                        name="streetLine2"
                        value={data.address.streetLine2 || ''}
                    />
                </div>
                <div className="Address-Div-Two">
                    <TextField
                        onChange={handleChange}
                        readOnly={!editMode}
                        label="City:"
                        variant="outlined"
                        type="text"
                        id="City"
                        name="city"
                        value={data.address.city || ''}
                    />
                    <TextField
                        onChange={handleChange}
                        readOnly={!editMode}
                        label="State:"
                        variant="outlined"
                        type="text"
                        id="State"
                        name="state"
                        value={data.address.state || ''}
                    />
                    <TextField
                        onChange={handleChange}
                        readOnly={!editMode}
                        label="Zip:"
                        variant="outlined"
                        type="text"
                        id="Zip"
                        name="zip"
                        value={data.address.zip || ''}
                    />
                </div>
            </div>
        </div>
    );
}

export default Address;