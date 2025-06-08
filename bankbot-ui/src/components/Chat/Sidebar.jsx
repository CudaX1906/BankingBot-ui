import { useState, useEffect } from 'react';
import {  fetchSessions, deleteSession } from '../../utils';

function Sidebar({ onSessionSelect, activeSessionId }) {
  const [sessions, setSessions] = useState([]);

  const loadSessions = async () => {
    const token = localStorage.getItem('token');
    const data = await fetchSessions(token);
    setSessions(data);
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handleNewSession = () => {
    localStorage.removeItem('session_id');
    onSessionSelect(null, true);
  };

  const handleDeleteSession = async (sessionIdToDelete) => {
    const token = localStorage.getItem('token');
    try {
      await deleteSession(sessionIdToDelete, token);
      console.log('Session deleted successfully');
      loadSessions();

      if (sessionIdToDelete === activeSessionId) {
        onSessionSelect(null, true);
        localStorage.removeItem('session_id');
      }
    } catch (err) {
      console.log('Could not delete session: ' + err.message);
    }
  };

  return (
    <div>
      <button onClick={handleNewSession}>+ New Chat</button>
      <ul>
        {sessions.map((s) => (
          <li key={s.session_id}>
            <span onClick={() => onSessionSelect(s.session_id)}>
              {new Date(s.started_at).toLocaleTimeString()}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteSession(s.session_id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
