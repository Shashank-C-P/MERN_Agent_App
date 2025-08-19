import { useState } from 'react';
import axios from 'axios';

const AddAgentForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // 1. Get the logged-in user's info from storage
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          // 2. Send the user's token in the request header for authorization
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        'http://localhost:5000/api/agents',
        { name, email, mobile, password },
        config
      );
      
      setMessage('Agent created successfully!');
      // Clear the form fields after success
      setName('');
      setEmail('');
      setMobile('');
      setPassword('');

    } catch (error) {
      setMessage(error.response?.data?.message || 'Error creating agent');
    }
  };

  return (
    <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Add New Agent</h2>
      {message && <p>{message}</p>}
      <form onSubmit={submitHandler}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required style={{ width: '300px', padding: '8px', marginBottom: '10px' }} /><br/>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required style={{ width: '300px', padding: '8px', marginBottom: '10px' }} /><br/>
        <input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile with country code" required style={{ width: '300px', padding: '8px', marginBottom: '10px' }} /><br/>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required style={{ width: '300px', padding: '8px', marginBottom: '10px' }} /><br/>
        <button type="submit" style={{ padding: '10px 15px' }}>Create Agent</button>
      </form>
    </div>
  );
};

export default AddAgentForm;