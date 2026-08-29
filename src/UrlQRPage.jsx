import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function UrlQRPage() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    document.title =
      "URL QR Code Generator – Free Online | QRForge";

    const metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Create a free URL QR code online with QRForge. Enter any website link, generate a scannable QR code instantly, and download it as a PNG image."
      );
    }
    const canonical = document.querySelector(
  'link[rel="canonical"]'
);

if (canonical) {
  canonical.setAttribute(
    "href",
    "https://www.qrforge.in/url-qr-code-generator"
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

  const trimmedUrl = url.trim();

  const normalizedUrl =
    trimmedUrl &&
    !/^https?:\/\//i.test(trimmedUrl)
      ? `https://${trimmedUrl}`
      : trimmedUrl;

  const isValidUrl = (() => {
    if (!normalizedUrl) return false;

    try {
      const parsedUrl = new URL(normalizedUrl);

      return (
        (parsedUrl.protocol === "http:" ||
          parsedUrl.protocol === "https:") &&
        parsedUrl.hostname.includes(".")
      );
    } catch {
      return false;
    }
  })();

  const qrValue = isValidUrl ? normalizedUrl : "";

  const downloadUrlQR = () => {
    const canvas = document.getElementById("url-qr");

    if (!canvas) return;

    const pngUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    link.href = pngUrl;
    link.download = "url-qr-code.png";
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
        <h1>URL QR Code Generator</h1>

        <p>
          Create a free QR code for any website or web page.
          Enter your URL below and download your QR code instantly.
        </p>
      </section>

      <div className="whatsapp-grid">
        <section className="card whatsapp-generator">
          <h2>Create URL QR Code</h2>

          <label htmlFor="url-input">
            Website URL
          </label>

          <input
            id="url-input"
            type="url"
            placeholder="example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          {url && !isValidUrl && (
            <p className="input-error">
              Please enter a valid website URL.
            </p>
          )}

          {isValidUrl && (
            <p className="whatsapp-link-preview">
              {normalizedUrl}
            </p>
          )}
        </section>

        <section className="card whatsapp-preview">
          <h2>URL QR Preview</h2>

          {qrValue ? (
            <>
              <div className="qr-box">
                <QRCodeCanvas
                  id="url-qr"
                  value={qrValue}
                  size={240}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <button
                type="button"
                className="primary-btn whatsapp-download-btn"
                onClick={downloadUrlQR}
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
                Enter a website URL to generate your QR code.
              </p>
            </div>
          )}
        </section>
      </div>
      <section className="seo-content">
  <h2>Free URL QR Code Generator</h2>

  <p>
    QRForge helps you create QR codes for websites, landing pages,
    online stores, portfolios, blogs and any web URL. Simply enter
    your website address and generate a scannable QR code instantly.
  </p>

  <h2>What is a URL QR Code?</h2>

  <p>
    A URL QR code stores a website address inside a QR code. Users can
    scan the code with their smartphone camera and open the website
    instantly without typing the URL manually.
  </p>

  <h2>How to Create a URL QR Code</h2>

  <ol className="seo-steps">
    <li>Enter your website URL.</li>
    <li>Verify the generated link.</li>
    <li>Generate your QR code automatically.</li>
    <li>Test it using a smartphone camera.</li>
    <li>Download and use it anywhere.</li>
  </ol>

  <h2>Frequently Asked Questions</h2>

  <div className="seo-faq">
    <div className="seo-faq-item">
      <h3>Is this URL QR generator free?</h3>
      <p>Yes, QRForge is completely free to use.</p>
    </div>

    <div className="seo-faq-item">
      <h3>Can I create QR codes for any website?</h3>
      <p>Yes, you can generate QR codes for almost any public website URL.</p>
    </div>

    <div className="seo-faq-item">
      <h3>Do I need to install software?</h3>
      <p>No, everything works directly in your browser.</p>
    </div>

    <div className="seo-faq-item">
      <h3>Can I download the QR code?</h3>
      <p>Yes, you can download it as a PNG image.</p>
    </div>
  </div>
</section>
    </main>
  );
}

export default UrlQRPage;