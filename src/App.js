import './App.css';

import  {useState, useEffect} from 'react';
import Html5QrcodePlugin from './Html5QrcodePlugin.jsx'

const publicVapidKey = "BC9qa4vU2oG-JWvQMioQKuyu8JzlBSINb257DzlmPBh0Dj-QXlrVE-4_Bjmg5BVaJRSwKuSrnVlh1ZvY_J5kySo";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const App = () => {
  const [decoded, setDecoded] = useState(null);

  const onNewScanResult = (decodedText, decodedResult) => {
    setDecoded(decodedResult);
    alert(JSON.stringify(decodedResult));
  }

  async function send() {
    // Register Service Worker
    console.log("Registering service worker...");
    await navigator.serviceWorker.register(`/sw.js`).then((response) => {
      return response.pushManager.getSubscription().then(() => {
        return response.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        })
      })
    });

    navigator.serviceWorker.getRegistration().then(function(reg) {
      reg.showNotification('Tada!!!!!!!!!!!!!!!!!! Whops-whops');
    });
  }


  useEffect(() => {
    if (Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
    if ("serviceWorker" in navigator) {
      send().catch(err => console.error(err));
    }
  }, [])

    return (
      <div className="App">
         
        <section className="App-section">
        <button style={{width: 200, height: 50}}>
            Show notification
        </button> 
          <div className="App-section-title"> Html5-qrcode React demo 4</div>
          <br />
          <br />
          <br />
          <Html5QrcodePlugin 
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}/>
        </section>
       
      </div>
    );
}

export default App;
