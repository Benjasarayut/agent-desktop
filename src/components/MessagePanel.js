import React from 'react';

export default function MessagePanel({ messages }) {
  return (
    <div className="message-panel">
      <h3>Messages</h3>
      <div className="message-list">
        {messages.length === 0 && <div className="muted">No messages yet.</div>}
        {messages.map((m, idx) => (
          <div key={idx} className="message-item">
            <div className="message-meta">
              <span className="from">{m.from || 'Supervisor'}</span>
              <span className="time">
                {new Date(m.timestamp || Date.now()).toLocaleTimeString()}
              </span>
            </div>
            <div className="message-body">{m.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
