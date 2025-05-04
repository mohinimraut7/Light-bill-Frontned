import React, { useState } from 'react';
import axios from 'axios';

const Test = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length === 2) {
      setImages(files); 
      setError(''); 
    } else {
      setError('Please select exactly two images');
    }
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    
    const formData = new FormData();
    Array.from(images).forEach((image) => {
      formData.append('images', image); 
    });

    try {
     
      const response = await axios.post('http://localhost:2000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      
      setSuccess(response.data.message); 
      setError(''); 
    } catch (err) {
     
      setError(err.response?.data?.message || 'An error occurred while uploading');
      setSuccess('');
    }
  };

  return (
    <div style={{marginTop:'200px',marginLeft:'100px'}}> 
      <h2>Upload Two Images</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Test;
//  if (user.ward === "Accountant") {
//   const matchedRemark = reportingDataSM.find(remark => remark.userId === user._id);

//   const signatureWidth = 30;
//   const signatureHeight = 15;
//   const xPos = rightSectionStart;
//   const yOffset = yPos - signatureHeight - 5;

//   if (matchedRemark) {
//     doc.addImage(
//       matchedRemark.signature,
//       'PNG',
//       xPos,
//       yOffset,
//       signatureWidth,
//       signatureHeight
//     );
//   }