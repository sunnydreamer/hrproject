
import React, { useState, useEffect } from 'react'
import './styles.css'
import axios from 'axios';
import formatDate from './util';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { Button, TextField, Grid, Avatar, Typography, MenuItem, Input, Container, InputLabel} from '@mui/material';





function Employment({ data, setData }) {
    const [editMode, setEditMode] = useState(false);
    const [originalData, setOriginalData] = useState(null);

    useEffect(() => {
        // Save the original data when the component mounts
        setOriginalData(data);
    }, []);

    function handleCancel(){
        setData(originalData);
        // setEditMode(false);
        setEditMode(false);
    }


    function handleChange(event) {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
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
        <Container >
            <div className="buttons">
                {editMode ? (
                   <div>
                   <Button onClick={handleSave}>Save</Button>
                   <Button onClick={handleCancel}>Cancel</Button>
                   </div>
                ) : (
                    <Button onClick={toggleEditMode} >Edit</Button>
                )}
            </div>
            <div className="Name-Div">
                <TextField
                    id="workAuthorization"
                    name="workAuthorization"
                    label="Visa Title"
                    type="text"
                    value={data.workAuthorization}
                    onChange={handleChange}
                    disabled={!editMode}
                />
                <TextField
                    id="workAuthorizationStart"
                    name="workAuthorizationStart"
                    label="Start Date"
                    type="date"
                    value={formatDate(data.workAuthorizationStart)}
                    onChange={handleChange}
                    disabled={!editMode}
                />
                <TextField
                    id="workAuthorizationEnd"
                    name="workAuthorizationEnd"
                    label="End Date"
                    type="date"
                    value={formatDate(data.workAuthorizationEnd)}
                    onChange={handleChange}
                    disabled={!editMode}
                />
            </div>
        </Container>
    );
}

export default Employment;