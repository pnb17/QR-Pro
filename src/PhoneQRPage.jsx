import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function PhoneQRPage() {
  const [countryCode, setCountryCode] = useState("91");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    document.title =
      "Phone QR Code Generator – Free Online | QRForge";

    const metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Create a free Phone QR code online with QRForge. Enter a phone number, generate a scannable call QR code instantly, and download it as PNG."
      );
    }
    const canonical = document.querySelector(
  'link[rel="canonical"]'
);

if (canonical) {
  canonical.setAttribute(
    "href",
    "https://www.qrforge.in/phone-qr-code-generator"
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

  const cleanPhone = phone.replace(/\D/g, "");

  const isValidPhone =
    countryCode === "91"
      ? cleanPhone.length === 10
      : cleanPhone.length >= 7 &&
        cleanPhone.length <= 15;

  const fullPhone = isValidPhone
    ? `+${countryCode}${cleanPhone}`
    : "";

  const qrValue = fullPhone
    ? `tel:${fullPhone}`
    : "";

  const downloadPhoneQR = () => {
    const canvas = document.getElementById("phone-qr");

    if (!canvas) return;

    const pngUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    link.href = pngUrl;
    link.download = "phone-qr-code.png";
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
        <h1>Phone QR Code Generator</h1>

        <p>
          Create a free QR code for a phone number.
          When scanned, users can quickly open their
          phone dialer and call the number.
        </p>
      </section>

      <div className="whatsapp-grid">
        <section className="card whatsapp-generator">
          <h2>Create Phone QR Code</h2>

          <label htmlFor="phone-number">
            Phone Number
          </label>

          <div className="phone-input-row">
            <select
              value={countryCode}
              onChange={(e) => {
                setCountryCode(e.target.value);
                setPhone("");
              }}
              aria-label="Country code"
            >
              <option value="91">India (+91)</option>
              <option value="1">
                USA / Canada (+1)
              </option>
              <option value="44">UK (+44)</option>
              <option value="971">UAE (+971)</option>
              <option value="61">
                Australia (+61)
              </option>
              <option value="65">
                Singapore (+65)
              </option>
            </select>

            <input
              id="phone-number"
              type="tel"
              inputMode="numeric"
              placeholder={
                countryCode === "91"
                  ? "9876543210"
                  : "Enter phone number"
              }
              value={phone}
              maxLength={
                countryCode === "91" ? 10 : 15
              }
              onChange={(e) =>
                setPhone(
                  e.target.value.replace(/\D/g, "")
                )
              }
            />
          </div>

          {phone && !isValidPhone && (
            <p className="input-error">
              {countryCode === "91"
                ? "Please enter a valid 10-digit Indian phone number."
                : "Please enter a valid phone number."}
            </p>
          )}

          {isValidPhone && (
            <p className="whatsapp-link-preview">
              Phone: {fullPhone}
            </p>
          )}
        </section>

        <section className="card whatsapp-preview">
          <h2>Phone QR Preview</h2>

          {qrValue ? (
            <>
              <div className="qr-box">
                <QRCodeCanvas
                  id="phone-qr"
                  value={qrValue}
                  size={240}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <button
                type="button"
                className="primary-btn whatsapp-download-btn"
                onClick={downloadPhoneQR}
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
                Enter a valid phone number to generate
                your QR code.
              </p>
            </div>
          )}
        </section>
      </div>
      {/* ================= SEO CONTENT ================= */}

<section className="seo-content">
  <h2>Free Phone QR Code Generator</h2>

  <p>
    Create a free Phone QR code with QRForge. Add your phone
    number and generate a scannable QR code that can help users
    quickly open their phone dialer.
  </p>

  <h2>How to Create a Phone QR Code</h2>

  <ol className="seo-steps">
    <li>
      <strong>Select your country.</strong> Choose the correct
      country code for your phone number.
    </li>

    <li>
      <strong>Enter your phone number.</strong> Add the number
      you want people to call.
    </li>

    <li>
      <strong>Generate your QR code.</strong> Your Phone QR code
      is created automatically.
    </li>

    <li>
      <strong>Download the QR code.</strong> Save it as a PNG
      image.
    </li>

    <li>
      <strong>Test before sharing.</strong> Scan the QR code and
      verify that the correct phone number opens.
    </li>
  </ol>

  <h2>Why Use a Phone QR Code?</h2>

  <p>
    Phone QR codes make it easier for customers to contact a
    business without manually typing a phone number. They can
    be useful on business cards, flyers, posters, advertisements
    and customer support materials.
  </p>

  <h2>Frequently Asked Questions</h2>

  <div className="seo-faq">
    <div className="seo-faq-item">
      <h3>Is the Phone QR Code Generator free?</h3>
      <p>
        Yes. You can create and download Phone QR codes for free
        with QRForge.
      </p>
    </div>

    <div className="seo-faq-item">
      <h3>What happens when someone scans the QR code?</h3>
      <p>
        On compatible devices, the phone dialer can open with
        the encoded phone number ready to call.
      </p>
    </div>

    <div className="seo-faq-item">
      <h3>Does QRForge support country codes?</h3>
      <p>
        Yes. You can select from the available country codes
        before entering the phone number.
      </p>
    </div>

    <div className="seo-faq-item">
      <h3>Can I download my Phone QR code?</h3>
      <p>
        Yes. The generated QR code can be downloaded as a PNG
        image.
      </p>
    </div>
  </div>
</section>
    </main>
  );
}

export default PhoneQRPage;