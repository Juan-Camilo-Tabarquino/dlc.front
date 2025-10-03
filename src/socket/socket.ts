/* eslint-disable no-console */
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initSocket = (companyId: number) => {
  if (!socket) {
    socket = io('https://dlcsas.com:3001', {
      query: { companyId },
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('✅ WebSocket conectado');
    });

    socket.on('disconnect', () => {
      console.log('⚠️ WebSocket desconectado');
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
