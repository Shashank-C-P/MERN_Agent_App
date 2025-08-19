import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddAgentForm from '../components/AddAgentForm';
import UploadCsvForm from '../components/UploadCsvForm';
import TaskList from '../components/TaskList';
import './DashboardPage.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  // State to manage which tab is currently active. Defaults to 'viewTasks'.
  const [activeTab, setActiveTab] = useState('viewTasks');
  // A state to force TaskList to re-render after an upload
  const [listVersion, setListVersion] = useState(0);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/');
    }
  }, [navigate]);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  // This function is passed to UploadCsvForm.
  // It runs after a successful upload.
  const handleUploadSuccess = () => {
    // 1. Switch to the 'viewTasks' tab.
    setActiveTab('viewTasks');
    // 2. Update the listVersion to force TaskList to re-fetch data.
    setListVersion(currentVersion => currentVersion + 1);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={logoutHandler} className="btn">
          Logout
        </button>
      </header>

      {/* Tab Navigation Buttons */}
      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'viewTasks' ? 'active' : ''}`} 
          onClick={() => setActiveTab('viewTasks')}>
          View Tasks
        </button>
        <button 
          className={`tab ${activeTab === 'addAgent' ? 'active' : ''}`} 
          onClick={() => setActiveTab('addAgent')}>
          Add Agent
        </button>
        <button 
          className={`tab ${activeTab === 'upload' ? 'active' : ''}`} 
          onClick={() => setActiveTab('upload')}>
          Upload List
        </button>
      </div>

      {/* Conditionally Rendered Content Based on Active Tab */}
      <main className="tab-content">
        {activeTab === 'viewTasks' && <TaskList key={listVersion} />}
        {activeTab === 'addAgent' && <AddAgentForm />}
        {activeTab === 'upload' && <UploadCsvForm onUploadSuccess={handleUploadSuccess} />}
      </main>
    </div>
  );
};

export default DashboardPage;