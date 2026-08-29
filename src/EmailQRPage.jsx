import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function EmailQRPage() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title =
      "Email QR Code Generator – Free Online | QRForge";

    const metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Create a free Email QR code online with QRForge. Add an email address, subject and message, generate your QR code instantly and download it as PNG."
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
    };
  }, []);

  const cleanEmail = email.trim();

  const isValidEmail =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);

  const qrValue = isValidEmail
    ? `mailto:${cleanEmail}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(message)}`
    : "";

  const downloadEmailQR = () => {
    const canvas = document.getElementById("email-qr");

    if (!canvas) return;

    const pngUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    link.href = pngUrl;
    link.download = "email-qr-code.png";
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
        <h1>Email QR Code Generator</h1>

        <p>
          Create a free QR code for email. Add an email
          address, optional subject and message, then download
          your QR code instantly.
        </p>
      </section>

      <div className="whatsapp-grid">
        <section className="card whatsapp-generator">
          <h2>Create Email QR Code</h2>

          <label htmlFor="email-address">
            Email Address
          </label>

          <input
            id="email-address"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {email && !isValidEmail && (
            <p className="input-error">
              Please enter a valid email address.
            </p>
          )}

          <label htmlFor="email-subject">
            Subject (Optional)
          </label>

          <input
            id="email-subject"
            type="text"
            placeholder="Enter email subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <label htmlFor="email-message">
            Message (Optional)
          </label>

          <textarea
            id="email-message"
            rows="5"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {isValidEmail && (
            <p className="whatsapp-link-preview">
              Email: {cleanEmail}
            </p>
          )}
        </section>

        <section className="card whatsapp-preview">
          <h2>Email QR Preview</h2>

          {qrValue ? (
            <>
              <div className="qr-box">
                <QRCodeCanvas
                  id="email-qr"
                  value={qrValue}
                  size={240}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <button
                type="button"
                className="primary-btn whatsapp-download-btn"
                onClick={downloadEmailQR}
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
                Enter a valid email address to generate
                your QR code.
              </p>
            </div>
          )}
        </section>
      </div>
      {/* ================= SEO CONTENT ================= */}

<section className="seo-content">
  <h2>Free Email QR Code Generator</h2>

  <p>
    Create a free Email QR code with QRForge. Add an email
    address, subject and message so users can quickly open
    their email app by scanning the QR code.
  </p>

  <h2>How to Create an Email QR Code</h2>

  <ol className="seo-steps">
    <li>
      <strong>Enter the email address.</strong> Add the email
      address where you want to receive messages.
    </li>

    <li>
      <strong>Add a subject.</strong> You can optionally
      pre-fill the email subject.
    </li>

    <li>
      <strong>Add a message.</strong> Enter an optional
      pre-written email message.
    </li>

    <li>
      <strong>Generate your QR code.</strong> Your Email QR
      code is created automatically.
    </li>

    <li>
      <strong>Download and test.</strong> Download the PNG
      and scan it before sharing or printing.
    </li>
  </ol>

  <h2>Why Use an Email QR Code?</h2>

  <p>
    Email QR codes make it easier for customers and visitors
    to contact you without manually typing an email address.
    They can be useful on business cards, brochures, posters,
    product packaging and customer support materials.
  </p>

  <h2>Frequently Asked Questions</h2>

  <div className="seo-faq">
    <div className="seo-faq-item">
      <h3>Is the Email QR Code Generator free?</h3>
      <p>
        Yes. You can create and download Email QR codes
        for free with QRForge.
      </p>
    </div>

    <div className="seo-faq-item">
      <h3>Can I add a subject and message?</h3>
      <p>
        Yes. Both the subject and message are optional and
        can be included in the QR code.
      </p>
    </div>

    <div className="seo-faq-item">
      <h3>What happens when someone scans the QR code?</h3>
      <p>
        Their compatible email app can open with the email
        address, subject and message already filled in.
      </p>
    </div>

    <div className="seo-faq-item">
      <h3>Can I download my Email QR code?</h3>
      <p>
        Yes. You can download the generated QR code as a
        PNG image.
      </p>
    </div>
  </div>
</section>
    </main>
  );
}

export default EmailQRPage;