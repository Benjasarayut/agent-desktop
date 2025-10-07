import React from 'react';

export default function AgentInfo({ agent, status }) {
  return (
    <div className="agent-info">
      <div className="row">
        <div className="avatar">{(agent?.name || agent?.agentCode || 'AG')[0]}</div>
        <div className="meta">
          <div className="name">{agent?.name || `Agent ${agent?.agentCode}`}</div>
          <div className={`status badge ${status.toLowerCase()}`}>{status}</div>
        </div>
      </div>
    </div>
  );
}
