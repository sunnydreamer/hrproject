import React, { useState, useEffect } from 'react'
import './styles.css'
import axios from 'axios';
import formatDate from './util';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { Button, TextField, Grid, Avatar, Typography, MenuItem, Input, Container, InputLabel} from '@mui/material';


function Contact({ data, setData }) {
    const [editMode, setEditMode] = useState(false);
    const [originalData, setOriginalData] = useState(null);

    useEffect(() => {
        // Save the original data when the component mounts
        setOriginalData(data);
    }, []);

    function handleCancel(){
        setData(originalData);
        setEditMode(false);
    }



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


    function handleChange(event) {


        const { name, value } = event.target;
        console.log(name, value)
        setData(prevData => ({
            ...prevData,
            phone: {
                ...prevData.phone,
                [name] : value
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
                    <div>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                    </div>
                ) : (
                    <Button onClick={toggleEditMode} >Edit</Button>
                )}
            </div>
            <div className="Name-Div">
                <div>
                    <TextField
                        id="cell"
                        name="cell"
                        label="Cell Phone Number"
                        type="tel"
                        value={data.phone.cell}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>
                <div>
                    <TextField
                        id="work"
                        name="work"
                        label="Work Phone Number"
                        type="tel"
                        value={data.phone.work}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>
            </div>
        </div>
    );
}

export default Contact;