import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function LocationQRPage() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    document.title =
      "Location QR Code Generator – Free Online | QRForge";

    const metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Create a free Location QR code online with QRForge. Enter latitude and longitude, generate a Google Maps QR code instantly, and download it as PNG."
      );
    }
const canonical = document.querySelector(
  'link[rel="canonical"]'
);

if (canonical) {
  canonical.setAttribute(
    "href",
    "https://www.qrforge.in/location-qr-code-generator"
  );
}
    return () => {
      document.title =
        "Free QR Code Generator Online | QRForge";

      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          "Create free QR codes online with QRForge. Generate QR codes for URLs, WhatsApp, WiFi, email, phone, SMS, locations and contacts. Fast, easy and free."
        );
      }
      if (canonical) {
  canonical.setAttribute(
    "href",
    "https://www.qrforge.in/"
  );
}
    };
  }, []);

  const lat = Number(latitude);
  const lng = Number(longitude);

  const isValidLocation =
    latitude !== "" &&
    longitude !== "" &&
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180;

  const qrValue = isValidLocation
    ? `https://www.google.com/maps?q=${lat},${lng}`
    : "";

  const downloadLocationQR = () => {
    const canvas = document.getElementById("location-qr");

    if (!canvas) return;

    const pngUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    link.href = pngUrl;
    link.download = "location-qr-code.png";
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
        <h1>Location QR Code Generator</h1>

        <p>
          Create a free QR code for a location. Enter latitude
          and longitude to generate a Google Maps QR code.
        </p>
      </section>

      <div className="whatsapp-grid">
        <section className="card whatsapp-generator">
          <h2>Create Location QR Code</h2>

          <label htmlFor="location-latitude">
            Latitude
          </label>

          <input
            id="location-latitude"
            type="number"
            step="any"
            placeholder="28.6139"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />

          <label htmlFor="location-longitude">
            Longitude
          </label>

          <input
            id="location-longitude"
            type="number"
            step="any"
            placeholder="77.2090"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />

          {(latitude || longitude) && !isValidLocation && (
            <p className="input-error">
              Enter a valid latitude (-90 to 90) and longitude
              (-180 to 180).
            </p>
          )}

          {isValidLocation && (
            <p className="whatsapp-link-preview">
              {lat}, {lng}
            </p>
          )}
        </section>

        <section className="card whatsapp-preview">
          <h2>Location QR Preview</h2>

          {qrValue ? (
            <>
              <div className="qr-box">
                <QRCodeCanvas
                  id="location-qr"
                  value={qrValue}
                  size={240}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <button
                type="button"
                className="primary-btn whatsapp-download-btn"
                onClick={downloadLocationQR}
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
                Enter valid coordinates to generate your
                location QR code.
              </p>
            </div>
          )}
        </section>
      </div>
      {/* ================= SEO CONTENT ================= */}

<section className="seo-content">
  <h2>Free Location QR Code Generator</h2>

  <p>
    Create a free Location QR code with QRForge. Enter latitude
    and longitude to generate a scannable QR code that opens the
    selected location in Google Maps.
  </p>

  <h2>How to Create a Location QR Code</h2>

  <ol className="seo-steps">
    <li>
      <strong>Enter the latitude.</strong> Add the latitude of
      the location you want to share.
    </li>

    <li>
      <strong>Enter the longitude.</strong> Add the correct
      longitude for the location.
    </li>

    <li>
      <strong>Generate your QR code.</strong> QRForge creates
      the location QR code automatically.
    </li>

    <li>
      <strong>Download the QR code.</strong> Save it as a PNG
      image.
    </li>

    <li>
      <strong>Test before sharing.</strong> Scan the QR code and
      verify that the correct map location opens.
    </li>
  </ol>

  <h2>Why Use a Location QR Code?</h2>

  <p>
    Location QR codes make it easy to share an exact place
    without asking users to type an address. They can be useful
    for shops, offices, events, hotels, invitations and printed
    marketing materials.
  </p>

  <h2>Frequently Asked Questions</h2>

  <div className="seo-faq">
    <div className="seo-faq-item">
      <h3>Is the Location QR Code Generator free?</h3>
      <p>
        Yes. You can create and download Location QR codes for
        free with QRForge.
      </p>
    </div>

    <div className="seo-faq-item">
      <h3>What information do I need?</h3>
      <p>
        You need the latitude and longitude of the location you
        want to share.
      </p>
    </div>

    <div className="seo-faq-item">
      <h3>What happens when someone scans the QR code?</h3>
      <p>
        The encoded location can open in Google Maps on a
        compatible device.
      </p>
    </div>

    <div className="seo-faq-item">
      <h3>Can I download the Location QR code?</h3>
      <p>
        Yes. You can download the generated QR code as a PNG
        image.
      </p>
    </div>
  </div>
</section>
    </main>
  );
}

export default LocationQRPage;