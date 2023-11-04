import { useState } from "react";
import "./App.css";
import QRCodeGenerator from "./components/QrCodeCard";

function App() {
  const [link, setLink] = useState("");
  const [qrCode, setQrCode] = useState(false);
  const generateQr = () => {
    if (link !== "") setQrCode(true);
  };
  return (
    <div className="App">
      {/* <div className="container">
        <input
          type="url"
          name="qr-code"
          id="qrCode"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter you link here..."
        />
        <div className="btns">
          {qrCode === false ? (
            <button onClick={generateQr}>Generate QR Code</button>
          ) : (
            <div>
              <button>Cancel</button>
              <button>Download</button>
            </div>
          )}
        </div>
      </div>  */}
      <QRCodeGenerator />
    </div>
  );
}

export default App;
