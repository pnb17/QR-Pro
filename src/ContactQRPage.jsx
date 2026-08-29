import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function ContactQRPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    document.title =
      "Contact QR Code Generator – Free vCard QR | QRForge";

    const metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Create a free Contact QR code with QRForge. Add name, company, phone, email and website to generate a downloadable vCard QR code."
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

  const cleanPhone = phone.replace(/[^\d+]/g, "");
  const cleanEmail = email.trim();
  const cleanWebsite = website.trim();

  const isValidEmail =
    !cleanEmail ||
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);

  const normalizedWebsite =
    cleanWebsite &&
    !/^https?:\/\//i.test(cleanWebsite)
      ? `https://${cleanWebsite}`
      : cleanWebsite;

  const isValidWebsite = (() => {
    if (!normalizedWebsite) return true;

    try {
      const parsedUrl = new URL(normalizedWebsite);
      return (
        (parsedUrl.protocol === "http:" ||
          parsedUrl.protocol === "https:") &&
        parsedUrl.hostname.includes(".")
      );
    } catch {
      return false;
    }
  })();

  const hasName =
    firstName.trim() || lastName.trim();

  const isValidContact =
    Boolean(hasName) &&
    isValidEmail &&
    isValidWebsite;

  const escapeVCard = (value) =>
    value
      .replace(/\\/g, "\\\\")
      .replace(/\n/g, "\\n")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,");

  const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

  const qrValue = isValidContact
    ? [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${escapeVCard(lastName.trim())};${escapeVCard(
          firstName.trim()
        )};;;`,
        `FN:${escapeVCard(fullName)}`,
        company.trim()
          ? `ORG:${escapeVCard(company.trim())}`
          : "",
        cleanPhone
          ? `TEL;TYPE=CELL:${escapeVCard(cleanPhone)}`
          : "",
        cleanEmail
          ? `EMAIL:${escapeVCard(cleanEmail)}`
          : "",
        normalizedWebsite
          ? `URL:${escapeVCard(normalizedWebsite)}`
          : "",
        "END:VCARD",
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  const downloadContactQR = () => {
    const canvas = document.getElementById("contact-qr");

    if (!canvas) return;

    const pngUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    link.href = pngUrl;
    link.download = "contact-vcard-qr-code.png";
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
        <h1>Contact QR Code Generator</h1>

        <p>
          Create a free vCard QR code for your contact details.
          Add your name, company, phone, email and website so
          people can quickly save your contact information.
        </p>
      </section>

      <div className="whatsapp-grid">
        <section className="card whatsapp-generator">
          <h2>Create Contact QR Code</h2>

          <label htmlFor="contact-first-name">
            First Name
          </label>

          <input
            id="contact-first-name"
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label htmlFor="contact-last-name">
            Last Name
          </label>

          <input
            id="contact-last-name"
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label htmlFor="contact-company">
            Company / Organization
          </label>

          <input
            id="contact-company"
            type="text"
            placeholder="Company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <label htmlFor="contact-phone">
            Phone Number
          </label>

          <input
            id="contact-phone"
            type="tel"
            placeholder="+91 9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label htmlFor="contact-email">
            Email
          </label>

          <input
            id="contact-email"
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

          <label htmlFor="contact-website">
            Website
          </label>

          <input
            id="contact-website"
            type="text"
            placeholder="example.com"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />

          {website && !isValidWebsite && (
            <p className="input-error">
              Please enter a valid website URL.
            </p>
          )}

          {!hasName &&
            (company || phone || email || website) && (
              <p className="input-error">
                Please enter at least a first name or last name.
              </p>
            )}

          {isValidContact && (
            <p className="whatsapp-link-preview">
              Contact: {fullName}
            </p>
          )}
        </section>

        <section className="card whatsapp-preview">
          <h2>Contact QR Preview</h2>

          {qrValue ? (
            <>
              <div className="qr-box">
                <QRCodeCanvas
                  id="contact-qr"
                  value={qrValue}
                  size={240}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <button
                type="button"
                className="primary-btn whatsapp-download-btn"
                onClick={downloadContactQR}
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
                Enter a name and valid contact details to
                generate your vCard QR code.
              </p>
            </div>
          )}
        </section>
      </div>
      {/* ================= SEO CONTENT ================= */}

<section className="seo-content">
  <h2>Free Contact QR Code Generator</h2>

  <p>
    Create a free Contact QR code with QRForge. Add your name,
    company, phone number, email and website to generate a vCard
    QR code that people can scan and save to their contacts.
  </p>

  <h2>How to Create a Contact QR Code</h2>

  <ol className="seo-steps">
    <li>
      <strong>Enter your name.</strong> Add your first name,
      last name or both.
    </li>

    <li>
      <strong>Add contact details.</strong> Enter your company,
      phone number, email and website as needed.
    </li>

    <li>
      <strong>Generate your QR code.</strong> QRForge creates
      your vCard QR code automatically.
    </li>

    <li>
      <strong>Download the QR code.</strong> Save it as a PNG
      image.
    </li>

    <li>
      <strong>Test before sharing.</strong> Scan the QR code and
      verify that your contact details appear correctly.
    </li>
  </ol>

  <h2>Why Use a Contact QR Code?</h2>

  <p>
    Contact QR codes make it easy to share contact information
    without asking someone to type it manually. They are useful
    for business cards, networking, events, brochures, resumes
    and professional profiles.
  </p>

  <h2>Frequently Asked Questions</h2>

  <div className="seo-faq">
    <div className="seo-faq-item">
      <h3>Is the Contact QR Code Generator free?</h3>
      <p>
        Yes. You can create and download Contact QR codes for
        free with QRForge.
      </p>
    </div>

    <div className="seo-faq-item">
      <h3>What is a vCard QR code?</h3>
      <p>
        A vCard QR code stores contact information such as name,
        phone number, email, company and website.
      </p>
    </div>

    <div className="seo-faq-item">
      <h3>What happens when someone scans the QR code?</h3>
      <p>
        On compatible devices, the contact details can open in
        the phone's contact app so they can be saved easily.
      </p>
    </div>

    <div className="seo-faq-item">
      <h3>Can I download my Contact QR code?</h3>
      <p>
        Yes. The generated Contact QR code can be downloaded as
        a PNG image.
      </p>
    </div>
  </div>
</section>
    </main>
  );
}

export default ContactQRPage;