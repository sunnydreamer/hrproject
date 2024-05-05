import React, { useState } from 'react';
import './styles.css';
import axios from 'axios';
import formatDate from './util';


function Employment({ data, setData }) {
    const [editMode, setEditMode] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        // console.log(name, value)
        setData(prevData => ({
            ...prevData,
            [name]: value
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

            <div className="Employment-Div-Hr">
                <label htmlFor="VisaTitle">Visa Title:</label>
                <input
                    type="text"
                    id="workAuthorization"
                    name="workAuthorization"
                    value={data.workAuthorization}
                    onChange={handleChange}
                    readOnly={!editMode}
                />
                <label htmlFor="VisaStartDate">Start Date:</label>
                <input
                    type="date"
                    id="workAuthorizationStart"
                    name="workAuthorizationStart"
                    value={formatDate(data.workAuthorizationStart)}
                    onChange={handleChange}
                    readOnly={!editMode}
                />
                <label htmlFor="VisaEndDate">End Date:</label>
                <input
                    type="date"
                    id="workAuthorizationEnd"
                    name="workAuthorizationEnd"
                    value={formatDate(data.workAuthorizationEnd)}
                    onChange={handleChange}
                    readOnly={!editMode}
                />
            </div>
        </div>
    );
}

export default Employment;