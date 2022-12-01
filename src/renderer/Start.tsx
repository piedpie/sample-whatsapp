import { useState } from "react";

export const Start = ({qr, auth}:{qr: string, auth: boolean}) => {
    const [loading, setLoading] = useState(false);
  const startWhatsappClient = () => {
    window.electron.ipcRenderer.sendMessage('start_whatsapp_client', []);
    setLoading(true);
  };

  return (
    <div>
      <h1>We have set puppeteer.executablePath to:</h1>
      <h2>C:\Program Files\Google\Chrome\Application\chrome.exe</h2>
      {!loading && !(auth || qr) && (
        <input
          type="button"
          onClick={startWhatsappClient}
          value="Click to start whatsapp client"
        />
      )}
     {
        (loading && !(qr || auth)) && <h1>loading, please wait ...</h1>
     }
    </div>
  );
};
