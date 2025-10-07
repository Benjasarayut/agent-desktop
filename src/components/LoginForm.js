import React, { useState } from 'react';
import { loginAgent } from '../services/api';
import { isValidAgentCode } from '../utils/validation';

export default function LoginForm({ onLogin }) {
  const [agentCode, setAgentCode] = useState('AG001');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!isValidAgentCode(agentCode)) {
      setError('Invalid agent code format');
      return;
    }
    setLoading(true);
    try {
      const agentData = await loginAgent(agentCode);
      onLogin(agentData);
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h2>Agent Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={agentCode}
          onChange={(e) => setAgentCode(e.target.value)}
          placeholder="Agent Code (e.g., AG001)"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Sign In'}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
