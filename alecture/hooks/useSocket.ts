import { useCallback } from 'react';
import io from 'socket.io-client';

const backUrl = 'https://jaehyeon.art';

const sockets: { [key: string]: SocketIOClient.Socket } = {};

const useSocket = (workspace?: string): [SocketIOClient.Socket | undefined, () => void] => {
  const disconnect = useCallback(() => {
    console.log('rerender', workspace);
    if (workspace) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  }, [workspace]);

  if (!workspace) {
    return [undefined, disconnect];
  }
  if (!sockets[workspace]) {
    sockets[workspace] = io.connect(`${backUrl}/ws-${workspace}`, {
      transports: ['websocket'],
      path: '/sleact/socket.io',
    });
  }

  return [sockets[workspace], disconnect];
};

export default useSocket;
