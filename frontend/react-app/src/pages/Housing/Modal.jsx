import React, { useState } from 'react';
import './styles.css'


const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation can be added here before submitting
    // onSubmit({ title, description });
    setTitle('');
    setDescription('');
    onClose(title, description)

  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>X</span>
        <h2>New Report</h2>
        <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>

      </div>
    </div>
  );
};

export default Modal;