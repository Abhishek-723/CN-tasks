import React, { useState } from "react";
import QRCode from "qrcode";
import "./QrCodeGenerator.css";

function NewQrCodeGenerator() {
  const [url, setUrl] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "blue",
  });

  const qrCodeGenerate = () => {
    try {
      if (!url) throw new Error("Please enter a valid URL.");
      QRCode.toDataURL(url, { width: 300 }, (err, qrDataUrl) => {
        if (err) throw new Error(err);
        setDataUrl(qrDataUrl);
      });
    } catch (error) {
      setAlert({ show: true, message: error.message, variant: "red" });
    }
  };

  const clear = () => {
    setUrl("");
    setDataUrl("");
  };

  return (
    <div className="container">
      <div className="header">
        <h1>QR Code Generator</h1>
      </div>
      <div className="content">
        <div className="qr-code">
          {dataUrl ? (
            <img src={dataUrl} alt="QR Code" />
          ) : (
            <div className="qr-code-placeholder">
              <div className="text">
                <span>Your QR</span>
                <h2>Generator</h2>
              </div>
            </div>
          )}
        </div>
        <div className="input-container">
          <input
            type="url"
            placeholder="Enter a valid URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") qrCodeGenerate();
            }}
          />
        </div>
        <div className="buttons">
          {dataUrl ? (
            <div className="clear-and-download">
              <button onClick={clear} className="clear-button">
                Clear
              </button>
              <a
                download="qrCode.png"
                href={dataUrl}
                className="download-button"
              >
                Download
              </a>
            </div>
          ) : (
            <button onClick={qrCodeGenerate} className="generate-button">
              Generate
            </button>
          )}
        </div>
      </div>
      {alert.show && (
        <div className={`alert ${alert.variant}`}>
          <span>{alert.message}</span>
        </div>
      )}
    </div>
  );
}

export default NewQrCodeGenerator;
