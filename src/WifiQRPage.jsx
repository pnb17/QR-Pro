import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function WifiQRPage() {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [security, setSecurity] = useState("WPA");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.title =
      "WiFi QR Code Generator – Free Online | QRForge";

    const metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Create a free WiFi QR code online with QRForge. Enter your WiFi name, password and security type, then download a scannable QR code instantly."
      );
    }

    return () => {
      document.title =
        "Free QR Code Generator Online | QRForge";
    };
  }, []);

  const escapeWifi = (value) =>
    value.replace(/([\\;,":])/g, "\\$1");

  const wifiValue = ssid.trim()
    ? `WIFI:T:${security};S:${escapeWifi(
        ssid.trim()
      )};P:${escapeWifi(password)};H:${
        hidden ? "true" : "false"
      };;`
    : "";

  const downloadWifiQR = () => {
    const canvas = document.getElementById("wifi-qr");

    if (!canvas) return;

    const pngUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    link.href = pngUrl;
    link.download = "wifi-qr-code.png";
    link.click();
  };

  return (
    <main className="container">
      <header className="tool-page-header">
        <a href="/" className="tool-page-home-link">
          ← Back to QRForge
        </a>
      </header>

      <section className="hero">
        <h1>WiFi QR Code Generator</h1>

        <p>
          Create a free WiFi QR code that lets people connect
          to your wireless network by scanning a QR code.
        </p>
      </section>

      <div className="whatsapp-grid">
        <section className="card whatsapp-generator">
          <h2>Create WiFi QR Code</h2>

          <label htmlFor="wifi-ssid">
            WiFi Network Name (SSID)
          </label>

          <input
            id="wifi-ssid"
            type="text"
            placeholder="Enter WiFi network name"
            value={ssid}
            onChange={(e) => setSsid(e.target.value)}
          />

          <label htmlFor="wifi-password">
            WiFi Password
          </label>

          <input
  id="wifi-password"
  type="text"
  placeholder={
    security === "nopass"
      ? "No password required"
      : "Enter WiFi password"
  }
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  disabled={security === "nopass"}
/>

          <label htmlFor="wifi-security">
            Security Type
          </label>

          <select
            id="wifi-security"
            value={security}
           onChange={(e) => {
  setSecurity(e.target.value);

  if (e.target.value === "nopass") {
    setPassword("");
  }
}}
          >
            <option value="WPA">WPA / WPA2 / WPA3</option>
            <option value="WEP">WEP</option>
            <option value="nopass">No Password</option>
          </select>

          <label className="wifi-hidden-option">
            <input
              type="checkbox"
              checked={hidden}
              onChange={(e) =>
                setHidden(e.target.checked)
              }
            />

            Hidden WiFi Network
          </label>
        </section>

        <section className="card whatsapp-preview">
          <h2>WiFi QR Preview</h2>

          {wifiValue ? (
            <>
              <div className="qr-box">
                <QRCodeCanvas
                  id="wifi-qr"
                  value={wifiValue}
                  size={240}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <button
                type="button"
                className="primary-btn whatsapp-download-btn"
                onClick={downloadWifiQR}
              >
                Download PNG
              </button>
            </>
          ) : (
            <div className="qr-empty">
              <div className="qr-placeholder-icon">
                QR
              </div>

              <p>
                Enter your WiFi network name to generate
                your QR code.
              </p>
            </div>
          )}
        </section>
      </div>
      <section className="seo-content">
  <h2>Free WiFi QR Code Generator</h2>

  <p>
    Create a free WiFi QR code with QRForge and make it easier for
    guests, customers or family members to connect to your wireless
    network. Enter your WiFi name, password and security type to
    generate a scannable QR code instantly.
  </p>

  <h2>How to Create a WiFi QR Code</h2>

  <ol className="seo-steps">
    <li>
      <strong>Enter your WiFi network name.</strong> Add the SSID of
      the wireless network you want to share.
    </li>

    <li>
      <strong>Enter your WiFi password.</strong> Add the network
      password, or choose No Password for an open network.
    </li>

    <li>
      <strong>Select the security type.</strong> Choose WPA/WPA2/WPA3,
      WEP or No Password.
    </li>

    <li>
      <strong>Choose the hidden network option.</strong> Enable it if
      your WiFi network is hidden.
    </li>

    <li>
      <strong>Generate and download.</strong> Scan the QR code to test
      it, then download it as a PNG image.
    </li>
  </ol>

  <h2>Why Use a WiFi QR Code?</h2>

  <p>
    A WiFi QR code allows people to connect to a wireless network
    without manually typing a long network name or password. It can be
    useful in homes, offices, hotels, restaurants, cafes, shops and
    other places where WiFi access is shared with visitors.
  </p>

  <h2>Frequently Asked Questions</h2>

  <div className="seo-faq">
    <div className="seo-faq-item">
      <h3>Is the WiFi QR Code Generator free?</h3>
      <p>
        Yes. QRForge lets you create and download WiFi QR codes for free.
      </p>
    </div>

    <div className="seo-faq-item">
      <h3>Does the WiFi password appear when scanning the QR code?</h3>
      <p>
        Compatible devices can use the information stored in the QR code
        to connect to the WiFi network without requiring the user to
        manually type the password.
      </p>
    </div>

    <div className="seo-faq-item">
      <h3>Can I create a QR code for WiFi without a password?</h3>
      <p>
        Yes. Select No Password as the security type to create a QR code
        for an open WiFi network.
      </p>
    </div>

    <div className="seo-faq-item">
      <h3>Can I create a QR code for a hidden WiFi network?</h3>
      <p>
        Yes. Enable the Hidden WiFi Network option before generating
        your QR code.
      </p>
    </div>

    <div className="seo-faq-item">
      <h3>Should I test the WiFi QR code before printing it?</h3>
      <p>
        Yes. Scan the QR code with a compatible phone before printing
        or sharing it to confirm that the network details are correct.
      </p>
    </div>
  </div>
</section>
    </main>
  );
}

export default WifiQRPage;