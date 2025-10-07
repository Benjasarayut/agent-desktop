import React from 'react';

export default function StatusPanel({ currentStatus, onStatusChange }) {
  const statuses = [
    { key: 'Available', label: 'Available', color: '#4CAF50' },
    { key: 'Busy', label: 'Busy', color: '#FF9800' },
    { key: 'Break', label: 'Break', color: '#2196F3' },
    { key: 'Offline', label: 'Offline', color: '#9E9E9E' },
  ];

  return (
    <div className="status-panel">
      <h3>
        Current Status:{' '}
        <span className={`status ${currentStatus.toLowerCase()}`}>{currentStatus}</span>
      </h3>
      <div className="status-buttons">
        {statuses.map((s) => (
          <button
            key={s.key}
            className={`status-btn ${s.key === currentStatus ? 'active' : ''}`}
            onClick={() => onStatusChange(s.key)}
            style={{ backgroundColor: s.color }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
