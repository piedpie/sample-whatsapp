import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

// eslint-disable-next-line import/prefer-default-export
export const Hello = () => {
  const [qr, setQr] = useState('');
  const [ready, setReady] = useState(false);
  const [auth, setAuth] = useState(false);
  const [authFailed, setAuthFailed] = useState(false);
  const [disconnected, setDisconnected] = useState(false);

  useEffect(() => {
    window.electron.ipcRenderer.on('qr', (arg) => {
      setQr(arg);
    });

    window.electron.ipcRenderer.on('authenticated', (arg) => {
      setAuth(true);
    });

    window.electron.ipcRenderer.on('ready', (arg) => {
      setReady(true);
    });

    window.electron.ipcRenderer.on('auth_failure', (arg) => {
      setAuthFailed(true);
    });

    window.electron.ipcRenderer.on('disconnected', (arg) => {
      setDisconnected(true);
    });

    return () => {
      window.electron.ipcRenderer.removeAllListeners('qr');
      window.electron.ipcRenderer.removeAllListeners('authenticated');
      window.electron.ipcRenderer.removeAllListeners('ready');
      window.electron.ipcRenderer.removeAllListeners('auth_failure');
      window.electron.ipcRenderer.removeAllListeners('disconnected');
    };
  }, []);

  const startWhatsappClient = () => {
    window.electron.ipcRenderer.sendMessage('start_whatsapp_client', []);
  };
  return (
    <div>
      {!qr && (
        <input
          type="button"
          onClick={startWhatsappClient}
          value="Start whatsapp client!"
        />
      )}

      {qr && (
        <div className="d-flex justify-content-center mt-2">
          <QRCode value={qr} />
        </div>
      )}

      {qr && <h1>QR recieved at: {new Date().toLocaleTimeString()}</h1>}
      {auth && <h1>Authenticated at: {new Date().toLocaleTimeString()}</h1>}
      {authFailed && (
        <h1>Authentiction failed at: {new Date().toLocaleTimeString()}</h1>
      )}
      {ready && <h1>Client ready at: {new Date().toLocaleTimeString()}</h1>}
      {disconnected && (
        <h1>Client disconnected at: {new Date().toLocaleTimeString()}</h1>
      )}
    </div>
  );
};
