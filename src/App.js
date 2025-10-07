import React, { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import StatusPanel from './components/StatusPanel';
import MessagePanel from './components/MessagePanel';
import AgentInfo from './components/AgentInfo';
import { connectSocket, disconnectSocket } from './services/socket';
import { notify } from './services/notifications';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [agent, setAgent] = useState(null);
  const [status, setStatus] = useState('Offline');
  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem('msgs');
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });

  // persist messages
  useEffect(() => {
    localStorage.setItem('msgs', JSON.stringify(messages));
  }, [messages]);

  // tray → status
  useEffect(() => {
    window.electronAPI?.onTrayStatus((next) => handleStatusChange(next));
  }, []);

  // socket lifecycle
  useEffect(() => {
    if (isLoggedIn && agent) {
      const s = connectSocket(agent.agentCode);

      s.on('status_updated', (data) => setStatus(data.status));
      s.on('new_message', (message) => {
        setMessages((prev) => [...prev, message]);
        notify('New Message', message.content, { sound: true });
      });

      return () => disconnectSocket();
    }
  }, [isLoggedIn, agent]);

  const handleLogin = (agentData) => {
    setAgent(agentData);
    setIsLoggedIn(true);
    setStatus('Available');
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    window.socket?.emit('update_status', { agentCode: agent?.agentCode, status: newStatus });
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div className="dashboard">
          <AgentInfo agent={agent} status={status} />
          <StatusPanel currentStatus={status} onStatusChange={handleStatusChange} />
          <MessagePanel messages={messages} />
        </div>
      )}
    </div>
  );
}

export default App;
