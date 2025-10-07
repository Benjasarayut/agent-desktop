import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || '';
let socket = null;

export const connectSocket = (agentCode) => {
  if (!SOCKET_URL) {
    // mock socket interface for dev without backend
    const listeners = {};
    const fake = {
      on: (ev, cb) => (listeners[ev] = cb),
      emit: () => {},
      disconnect: () => {},
    };
    window.socket = fake;
    return fake;
  }

  socket = io(SOCKET_URL, {
    query: { agentCode, type: 'agent' },
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 500,
    reconnectionDelayMax: 5000,
    timeout: 10000,
  });

  socket.on('connect', () => console.log('✅ Socket connected'));
  socket.on('connect_error', (err) => console.error('🔴 Socket error:', err?.message));
  socket.on('disconnect', (reason) => console.warn('⚠️ Socket disconnected:', reason));

  window.socket = socket;
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    window.socket = null;
  }
};
