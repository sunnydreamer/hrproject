import React, { useState } from 'react';
import './styles.css';
import axios from 'axios';

function Contact({ data, setData }) {
    const [editMode, setEditMode] = useState(false);

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
            <div className="Contact-Div">
                <div>
                    <label htmlFor="cell">Cell Phone Number:</label>
                    <input type="tel" id="cell" name="cell" value={data.phone.cell} onChange={handleChange} readOnly={!editMode} />
                </div>
                <div>
                    <label htmlFor="work">Work Phone Number:</label>
                    <input type="tel" id="work" name="work" value={data.phone.work} onChange={handleChange} readOnly={!editMode}/>
                </div>
            </div>
        </div>
    );
}

export default Contact;