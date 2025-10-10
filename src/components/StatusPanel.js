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
        {statuses.map((s) => {
          const isActive = s.key === currentStatus;
          return (
            <button
              key={s.key}
              className={`status-btn ${isActive ? 'active' : ''}`}
              disabled={isActive}
              onClick={() => { if (!isActive) onStatusChange(s.key); }}
              style={{
                backgroundColor: isActive ? '#e5e7eb' : s.color,
                color: isActive ? '#6b7280' : '#ffffff'
              }}
              aria-pressed={isActive}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
