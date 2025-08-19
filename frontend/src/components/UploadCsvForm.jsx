import { useState } from 'react';
import axios from 'axios';

// 1. Accept onUploadSuccess as a "prop" (a property passed from a parent component)
const UploadCsvForm = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/lists/upload',
        formData,
        config
      );

      setMessage(data.message);
      
      // 2. Call the function passed from the parent after a successful upload
      if (onUploadSuccess) {
        onUploadSuccess();
      }

    } catch (error) {
      setMessage(error.response?.data?.message || 'Error uploading file');
    }
  };

  // The JSX is updated to use CSS classes
  return (
    <div className="card">
      <h2>Upload CSV</h2>
      {message && <p className={message.includes('successfully') ? 'success-message' : 'error-message'}>{message}</p>}
      <form onSubmit={handleSubmit} className="upload-form">
        <input type="file" accept=".csv" onChange={handleFileChange} className="file-input"/>
        <button type="submit" className="btn">Upload</button>
      </form>
    </div>
  );
};

export default UploadCsvForm;