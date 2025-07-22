// --- File: frontend/socket.ts ---
import io from 'socket.io-client';

export const socket = io('http://localhost:5000', {
  transports: ['websocket'],
transportOptions:{
    websocket: {
      extraHeaders: {
        'Access-Control-Allow-Origin': 'http://localhost:5173',
      },
    },
  },
});
