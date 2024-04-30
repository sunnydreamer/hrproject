import React, { useState } from 'react';
import './styles.css';
import axios from 'axios';

function Employment({ data, setData }) {
    const [editMode, setEditMode] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            employment: {
                ...prevData.employment,
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
            <div className="buttons">
                {editMode ? (
                    <button onClick={handleSave}>Save</button>
                ) : (
                    <button onClick={toggleEditMode}>Edit</button>
                )}
            </div>
            <div className="Employment-Div">
                <label htmlFor="VisaTitle">Visa Title:</label>
                <input
                    type="text"
                    id="VisaTitle"
                    name="VisaTitle"
                    value={data.visa.visaTitle}
                    onChange={handleChange}
                    readOnly={!editMode}
                />
                <label htmlFor="VisaStartDate">Start Date:</label>
                <input
                    type="date"
                    id="VisaStartDate"
                    name="VisaStartDate"
                    value={data.visa.startDate}
                    onChange={handleChange}
                    readOnly={!editMode}
                />
                <label htmlFor="VisaEndDate">End Date:</label>
                <input
                    type="date"
                    id="VisaEndDate"
                    name="VisaEndDate"
                    value={data.visa.endDate}
                    onChange={handleChange}
                    readOnly={!editMode}
                />
            </div>
        </div>
    );
}

export default Employment;