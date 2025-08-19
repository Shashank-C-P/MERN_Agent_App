import { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [groupedTasks, setGroupedTasks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get('http://localhost:5000/api/lists', config);

        // Group the tasks by agent name for easy display
        const groups = data.reduce((acc, task) => {
          const agentName = task.agent.name;
          if (!acc[agentName]) {
            acc[agentName] = [];
          }
          acc[agentName].push(task);
          return acc;
        }, {});
        
        setGroupedTasks(groups);
      } catch (error) {
        setError('Could not fetch tasks. Please try uploading a new list.');
        console.error('Could not fetch tasks', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []); // The empty array [] means this runs only once when the component loads

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Distributed Tasks</h2>
      {Object.keys(groupedTasks).length === 0 ? (
        <p>No tasks found. Upload a CSV to see the list.</p>
      ) : (
        Object.entries(groupedTasks).map(([agentName, tasks]) => (
          <div key={agentName} style={{ marginBottom: '20px' }}>
            <h3>Agent: {agentName} ({tasks[0].agent.email})</h3>
            <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{textAlign: 'left'}}>First Name</th>
                  <th style={{textAlign: 'left'}}>Phone</th>
                  <th style={{textAlign: 'left'}}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id}>
                    <td>{task.firstName}</td>
                    <td>{task.phone}</td>
                    <td>{task.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;