

import React, { useState, useEffect } from 'react'
import './styles.css'
import axios from 'axios';
import formatDate from './util';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { Button, TextField, Grid, Avatar, Typography, MenuItem, Input, Container, InputLabel} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/fetchUserData";


function Address({ data, setData }) {
    const [editMode, setEditMode] = useState(false);
    const [originalData, setOriginalData] = useState(null);

    useEffect(() => {
        // Save the original data when the component mounts
        setOriginalData(data);
    }, []);


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

    // const dispatch = useDispatch();
    // const dataRedux = useSelector((state) => state.payload);


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
        store.dispatch(setUserObject(data));
        setEditMode(false);
    }

    function toggleEditMode() {
        setEditMode(prevMode => !prevMode);
    }

    function handleCancel(){
        setData(originalData);
        setEditMode(false);
    }

    return (
        <div className='personal'>
            <div className="buttons">
                {editMode ? (
                    <div>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                    </div>
                ) : (
                    <Button onClick={toggleEditMode}>Edit</Button>
                )}
            </div>

            <div className="Name-Div">
                <div className="Address-Div-One">
                    <TextField
                        onChange={handleChange}
                        disabled={!editMode}
                        label="Street Name:"
                        variant="outlined"
                        type="text"
                        id="StreetName"
                        name="street"
                        value={data.address.street || ''}
                    />
                    <TextField
                        onChange={handleChange}
                        disabled={!editMode}
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
                        disabled={!editMode}
                        label="City:"
                        variant="outlined"
                        type="text"
                        id="City"
                        name="city"
                        value={data.address.city || ''}
                    />
                    <TextField
                        onChange={handleChange}
                        disabled={!editMode}
                        label="State:"
                        variant="outlined"
                        type="text"
                        id="State"
                        name="state"
                        value={data.address.state || ''}
                    />
                    <TextField
                        onChange={handleChange}
                        disabled={!editMode}
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