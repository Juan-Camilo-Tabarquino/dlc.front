import { useEffect } from 'react';
import { getSocket } from './socket';

export const useSocket = <T>(
  event: string,
  handler: (data: T) => void,
  deps: unknown[] = [],
) => {
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;
    socket.on(event, handler);
    return () => {
      socket.off(event, handler);
    };
  }, deps);
};
