import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { QRCodeSVG } from "qrcode.react";
import "./App.css";

function App() {
  const [type, setType] = useState("text");
  const [value, setValue] = useState("");
  const [qrValue, setQrValue] = useState("");

  // History
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("qrHistory");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [favorites, setFavorites] = useState(() => {
  try {
    const saved = localStorage.getItem("qrFavorites");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
});

  // QR customization
  const [qrColor, setQrColor] = useState("#000000");
  const [preset, setPreset] = useState("classic");
  const [frameStyle, setFrameStyle] = useState("classic");
  const [qrLabel, setQrLabel] = useState("Scan Me");
  useEffect(() => {
  setQrLabel(getDefaultLabel(type));
}, [type]);
const [showQrLabel, setShowQrLabel] = useState(true);
  

const applyPreset = (name) => {
  setPreset(name);

  switch (name) {
    case "blue":
      setQrColor("#2855c5");
      setBgColor("#ffffff");
      setErrorLevel("H");
      break;

    case "green":
      setQrColor("#16804a");
      setBgColor("#ffffff");
      setErrorLevel("H");
      break;

    case "purple":
      setQrColor("#6d3fc7");
      setBgColor("#ffffff");
      setErrorLevel("H");
      break;

    case "red":
      setQrColor("#c62828");
      setBgColor("#ffffff");
      setErrorLevel("H");
      break;

    default:
      setQrColor("#000000");
      setBgColor("#ffffff");
      setErrorLevel("H");
  }
};
  const [bgColor, setBgColor] = useState("#ffffff");
  const [qrSize, setQrSize] = useState(240);
  const [errorLevel, setErrorLevel] = useState("H");

  // Logo
  const [logo, setLogo] = useState("");
  const [logoSize, setLogoSize] = useState(50);

  // Wi-Fi
  const [wifiSSID, setWifiSSID] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiSecurity, setWifiSecurity] = useState("WPA");

  // Location
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Contact
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organization, setOrganization] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactWebsite, setContactWebsite] = useState("");

  // SMS
  const [smsNumber, setSmsNumber] = useState("");
  const [smsMessage, setSmsMessage] = useState("");

  // ==============================
  // Wi-Fi Escape
  // ==============================

  const escapeWifi = (text) => {
    return text
      .replace(/\\/g, "\\\\")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,")
      .replace(/:/g, "\\:");
  };

  // ==============================
  // Generate QR Content
  // ==============================

  const getQRValue = () => {
    switch (type) {
      case "website": {
        if (!value.trim()) return "";

        return value.trim().startsWith("http://") ||
          value.trim().startsWith("https://")
          ? value.trim()
          : `https://${value.trim()}`;
      }

      case "email": {
        if (!value.trim()) return "";
        return `mailto:${value.trim()}`;
      }

      case "phone": {
  if (!value.trim()) return "";

  const phoneNumber = value.trim().replace(/[^\d+]/g, "");

  if (!phoneNumber) return "";

  return `tel:${phoneNumber}`;
}

      case "whatsapp": {
        if (!value.trim()) return "";

        const number = value.replace(/\D/g, "");

        if (!number) return "";

        return `https://wa.me/${number}`;
      }

      case "wifi": {
        if (!wifiSSID.trim()) return "";

        return `WIFI:T:${wifiSecurity};S:${escapeWifi(
          wifiSSID.trim()
        )};P:${escapeWifi(wifiPassword)};;`;
      }

      case "location": {
        if (!latitude.trim() || !longitude.trim()) return "";

        return `https://www.google.com/maps?q=${encodeURIComponent(
          latitude.trim()
        )},${encodeURIComponent(longitude.trim())}`;
      }

      case "contact": {
        if (
          !firstName.trim() &&
          !lastName.trim() &&
          !contactPhone.trim() &&
          !contactEmail.trim()
        ) {
          return "";
        }

        return `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${firstName} ${lastName}
ORG:${organization}
TEL:${contactPhone}
EMAIL:${contactEmail}
URL:${contactWebsite}
END:VCARD`;
      }

      case "sms": {
        if (!smsNumber.trim()) return "";

        return `SMSTO:${smsNumber.trim()}:${smsMessage}`;
      }

      default:
        return value.trim();
    }
  };

  // ==============================
  // Generate QR + Save History
  // ==============================

  const generateQR = () => {
    const result = getQRValue();

    if (!result) {
      alert("Please enter the required information first.");
      return;
    }

    setQrValue(result);

    const newItem = {
      id: Date.now(),
      type: type,
      value: result,

      // Save original form data
      data: {
        text: value,

        wifiSSID: wifiSSID,
        wifiPassword: wifiPassword,
        wifiSecurity: wifiSecurity,

        latitude: latitude,
        longitude: longitude,

        firstName: firstName,
        lastName: lastName,
        organization: organization,
        contactPhone: contactPhone,
        contactEmail: contactEmail,
        contactWebsite: contactWebsite,

        smsNumber: smsNumber,
        smsMessage: smsMessage,
      },

      createdAt: new Date().toLocaleString(),
    };

    const updatedHistory = [
      newItem,
      ...history.filter((item) => item.value !== result),
    ].slice(0, 10);

    setHistory(updatedHistory);

    localStorage.setItem(
      "qrHistory",
      JSON.stringify(updatedHistory)
    );
  };

  // ==============================
  // Clear Current QR
  // ==============================
const selectTemplate = (templateType) => {
  setType(templateType);

  // Clear current QR
  setQrValue("");

  // Clear common field
  setValue("");

  // Clear Wi-Fi fields
  setWifiSSID("");
  setWifiPassword("");

  // Clear Location fields
  setLatitude("");
  setLongitude("");

  // Clear Contact fields
  setFirstName("");
  setLastName("");
  setOrganization("");
  setContactPhone("");
  setContactEmail("");
  setContactWebsite("");

  // Clear SMS fields
  setSmsNumber("");
  setSmsMessage("");
};
  const clearQR = () => {
    setValue("");
    setQrValue("");

    setWifiSSID("");
    setWifiPassword("");
    setWifiSecurity("WPA");

    setLatitude("");
    setLongitude("");

    setFirstName("");
    setLastName("");
    setOrganization("");
    setContactPhone("");
    setContactEmail("");
    setContactWebsite("");

    setSmsNumber("");
    setSmsMessage("");
  };

  // ==============================
  // Use History Item
  // ==============================

  const loadHistoryItem = (item) => {
    setType(item.type);
    setQrValue(item.value);

    const data = item.data;

    // Old history items
    if (!data) {
      return;
    }

    setValue(data.text || "");

    setWifiSSID(data.wifiSSID || "");
    setWifiPassword(data.wifiPassword || "");
    setWifiSecurity(data.wifiSecurity || "WPA");

    setLatitude(data.latitude || "");
    setLongitude(data.longitude || "");

    setFirstName(data.firstName || "");
    setLastName(data.lastName || "");
    setOrganization(data.organization || "");
    setContactPhone(data.contactPhone || "");
    setContactEmail(data.contactEmail || "");
    setContactWebsite(data.contactWebsite || "");

    setSmsNumber(data.smsNumber || "");
    setSmsMessage(data.smsMessage || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==============================
  // Delete History Item
  // ==============================

  const deleteHistoryItem = (id) => {
    const updatedHistory = history.filter(
      (item) => item.id !== id
    );

    setHistory(updatedHistory);

    localStorage.setItem(
      "qrHistory",
      JSON.stringify(updatedHistory)
    );
  };
  const toggleFavorite = (item) => {
  const exists = favorites.some(
    (favorite) => favorite.value === item.value
  );

  let updatedFavorites;

  if (exists) {
    updatedFavorites = favorites.filter(
      (favorite) => favorite.value !== item.value
    );
  } else {
    updatedFavorites = [item, ...favorites].slice(0, 20);
  }

  setFavorites(updatedFavorites);

  localStorage.setItem(
    "qrFavorites",
    JSON.stringify(updatedFavorites)
  );
};

  // ==============================
  // Clear All History
  // ==============================

  const clearHistory = () => {
    if (history.length === 0) return;

    const confirmDelete = window.confirm(
      "Clear all QR history?"
    );

    if (!confirmDelete) return;

    setHistory([]);

    localStorage.removeItem("qrHistory");
  };

  // ==============================
  // Logo Upload
  // ==============================

  const handleLogoUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setLogo(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogo("");
  };

  // ==============================
  // Get SVG
  // ==============================

  const getSVG = () => {
    const svg = document.getElementById("qr-code");

    if (!svg) return null;

    return new XMLSerializer().serializeToString(svg);
  };

  // ==============================
  // Download SVG
  // ==============================

  const downloadSVG = () => {
  const qrContainer = document.querySelector(".qr-result");

  if (!qrContainer) return;

  const svg = qrContainer.querySelector("#qr-code");

  if (!svg) return;

  const qrSource =
    new XMLSerializer().serializeToString(svg);

  const labelText =
    showQrLabel && qrLabel.trim()
      ? qrLabel.trim()
      : "";

  const svgWidth = 1000;
  const qrSizeExport = 800;
  const labelArea = labelText ? 140 : 0;
  const svgHeight = qrSizeExport + labelArea;

  const parser = new DOMParser();
  const qrDocument = parser.parseFromString(
    qrSource,
    "image/svg+xml"
  );

  const qrElement =
    qrDocument.documentElement;

  qrElement.setAttribute(
    "width",
    qrSizeExport
  );

  qrElement.setAttribute(
    "height",
    qrSizeExport
  );

  const serializer = new XMLSerializer();

  const qrMarkup =
    serializer.serializeToString(qrElement);

  const labelMarkup = labelText
    ? `
      <text
        x="500"
        y="870"
        text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif"
        font-size="42"
        font-weight="700"
        fill="${qrColor}"
      >
        ${labelText
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}
      </text>
    `
    : "";

  const finalSVG = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${svgWidth}"
      height="${svgHeight}"
      viewBox="0 0 ${svgWidth} ${svgHeight}"
    >

      <rect
        width="100%"
        height="100%"
        fill="${bgColor}"
      />

      <g transform="translate(100 20)">
        ${qrMarkup}
      </g>

      ${labelMarkup}

    </svg>
  `;

  const blob = new Blob(
    [finalSVG],
    {
      type: "image/svg+xml;charset=utf-8",
    }
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download = "qr-code.svg";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};
// ==============================
// Download PDF
// ==============================
const downloadPDF = () => {
  const qrContainer = document.querySelector(".qr-result");

  if (!qrContainer) return;

  const svg = qrContainer.querySelector("#qr-code");

  if (!svg) return;

  const svgData = new XMLSerializer().serializeToString(svg);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const size = 1200;

  canvas.width = size;
  canvas.height = showQrLabel && qrLabel.trim()
    ? 1350
    : 1200;

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const img = new Image();

  img.onload = () => {
    const qrSize = 1000;
    const x = (canvas.width - qrSize) / 2;
    const y = 50;

    ctx.drawImage(img, x, y, qrSize, qrSize);

    if (showQrLabel && qrLabel.trim()) {
      ctx.fillStyle = qrColor;
      ctx.font = "bold 42px Arial";
      ctx.textAlign = "center";

      ctx.fillText(
        qrLabel.trim(),
        canvas.width / 2,
        1120
      );
    }

    const imageData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const pageWidth = 210;
    const pageHeight = 297;

    const pdfWidth = 170;
    const pdfHeight =
      canvas.height / canvas.width * pdfWidth;

    const xPdf = (pageWidth - pdfWidth) / 2;
    const yPdf = (pageHeight - pdfHeight) / 2;

    pdf.addImage(
      imageData,
      "PNG",
      xPdf,
      yPdf,
      pdfWidth,
      pdfHeight
    );

    pdf.save("qr-code.pdf");
  };

  img.src =
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(svgData);
};

  // ==============================
  // Download PNG / JPG
  // ==============================

  const downloadImage = (format) => {
  const qrContainer = document.querySelector(".qr-result");

  if (!qrContainer) return;

  const width = 1200;
  const height = showQrLabel && qrLabel.trim()
    ? 1350
    : 1200;

  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  const svg = qrContainer.querySelector("#qr-code");

  if (!svg) return;

  const source =
    new XMLSerializer().serializeToString(svg);

  const svgBlob = new Blob([source], {
    type: "image/svg+xml;charset=utf-8",
  });

  const url = URL.createObjectURL(svgBlob);

  const image = new Image();

  image.onload = () => {
    const qrDrawSize = 1000;

    const x = (width - qrDrawSize) / 2;
    const y = 50;

    ctx.drawImage(
      image,
      x,
      y,
      qrDrawSize,
      qrDrawSize
    );

    // QR Label
    if (showQrLabel && qrLabel.trim()) {
      ctx.fillStyle = qrColor;
      ctx.font = "bold 48px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(
        qrLabel.trim(),
        width / 2,
        1130
      );
    }

    const mimeType =
      format === "png"
        ? "image/png"
        : "image/jpeg";

    const extension =
      format === "png"
        ? "png"
        : "jpg";

    const imageURL = canvas.toDataURL(
      mimeType,
      0.95
    );

    const link = document.createElement("a");

    link.href = imageURL;
    link.download = `qr-code.${extension}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  image.onerror = () => {
    URL.revokeObjectURL(url);
    alert("Unable to create QR image.");
  };

  image.src = url;
};

  // ==============================
  // Copy Content
  // ==============================

  const copyContent = async () => {
    if (!qrValue) return;

    try {
      await navigator.clipboard.writeText(qrValue);

      alert("QR content copied!");
    } catch {
      alert("Unable to copy content.");
    }
  };

  // ==============================
  // Placeholder
  // ==============================
const getDefaultLabel = (qrType) => {
  switch (qrType) {
    case "website":
      return "Scan Me";

    case "whatsapp":
      return "Chat on WhatsApp";

    case "wifi":
      return "Connect to Wi-Fi";

    case "phone":
      return "Call Me";

    case "email":
      return "Email Me";

    case "location":
      return "View Location";

    case "contact":
      return "Save Contact";

    case "sms":
      return "Send SMS";

    case "text":
    default:
      return "Scan Me";
  }
};
  
  const getPlaceholder = () => {
    switch (type) {
      case "website":
        return "example.com";

      case "email":
        return "example@email.com";

      case "phone":
        return "+91 9876543210";

      case "whatsapp":
        return "919876543210";

      case "text":
        return "Enter your text here...";

      default:
        return "";
    }
  };

  // ==============================
  // Input Fields
  // ==============================

  const renderInputFields = () => {
    switch (type) {
      case "wifi":
        return (
          <div className="extra-fields">

            <label>Wi-Fi Network Name (SSID)</label>

            <input
              type="text"
              value={wifiSSID}
              onChange={(e) =>
                setWifiSSID(e.target.value)
              }
              placeholder="Enter Wi-Fi name..."
            />

            <label>Wi-Fi Password</label>

            <input
              type="text"
              value={wifiPassword}
              onChange={(e) =>
                setWifiPassword(e.target.value)
              }
              placeholder="Enter Wi-Fi password..."
            />

            <label>Security Type</label>

            <select
              value={wifiSecurity}
              onChange={(e) =>
                setWifiSecurity(e.target.value)
              }
            >
              <option value="WPA">
                WPA / WPA2
              </option>

              <option value="WEP">
                WEP
              </option>

              <option value="nopass">
                No Password
              </option>
            </select>

          </div>
        );

      case "location":
        return (
          <div className="extra-fields">

            <label>Latitude</label>

            <input
              type="text"
              value={latitude}
              onChange={(e) =>
                setLatitude(e.target.value)
              }
              placeholder="e.g. 25.3176"
            />

            <label>Longitude</label>

            <input
              type="text"
              value={longitude}
              onChange={(e) =>
                setLongitude(e.target.value)
              }
              placeholder="e.g. 82.9739"
            />

          </div>
        );

      case "contact":
        return (
          <div className="extra-fields">

            <label>First Name</label>

            <input
              type="text"
              value={firstName}
              onChange={(e) =>
                setFirstName(e.target.value)
              }
              placeholder="First name"
            />

            <label>Last Name</label>

            <input
              type="text"
              value={lastName}
              onChange={(e) =>
                setLastName(e.target.value)
              }
              placeholder="Last name"
            />

            <label>Company / Organization</label>

            <input
              type="text"
              value={organization}
              onChange={(e) =>
                setOrganization(e.target.value)
              }
              placeholder="Company name"
            />

            <label>Phone</label>

            <input
              type="text"
              value={contactPhone}
              onChange={(e) =>
                setContactPhone(e.target.value)
              }
              placeholder="+91 9876543210"
            />

            <label>Email</label>

            <input
              type="email"
              value={contactEmail}
              onChange={(e) =>
                setContactEmail(e.target.value)
              }
              placeholder="example@email.com"
            />

            <label>Website</label>

            <input
              type="text"
              value={contactWebsite}
              onChange={(e) =>
                setContactWebsite(e.target.value)
              }
              placeholder="https://example.com"
            />

          </div>
        );

      case "sms":
        return (
          <div className="extra-fields">

            <label>Phone Number</label>

            <input
              type="text"
              value={smsNumber}
              onChange={(e) =>
                setSmsNumber(e.target.value)
              }
              placeholder="+91 9876543210"
            />

            <label>SMS Message</label>

            <textarea
              value={smsMessage}
              onChange={(e) =>
                setSmsMessage(e.target.value)
              }
              placeholder="Enter your message..."
              rows="4"
            />

          </div>
        );

      default:
        return (
          <>
            <label>Content</label>

            <textarea
              value={value}
              onChange={(e) =>
                setValue(e.target.value)
              }
              placeholder={getPlaceholder()}
              rows="6"
            />
          </>
        );
    }
  };

  // ==============================
  // UI
  // ==============================

  return (
    <div className="app">

      <header className="header">

        <div className="logo">

          <div className="logo-icon">
            QR
          </div>

          <span>QR Pro</span>

        </div>

        <div className="header-badge">
          Free QR Code Generator
        </div>

      </header>


      <main className="container">

        <section className="hero">

          <h1>Create QR Codes Easily</h1>

          <p>
            Generate professional QR codes and
            customize them to your needs.
          </p>

        </section>
        <section className="templates">

  <h2>Quick QR Templates</h2>

  <p className="templates-subtitle">
    Choose a template to create your QR code faster
  </p>

  <div className="template-grid">

    <button
  className={`template-btn ${
    type === "website" ? "active" : ""
  }`}
  onClick={() => selectTemplate("website")}
>
      <span>🌐</span>
      <strong>Website</strong>
      <small>URL QR Code</small>
    </button>

    <button
     className={`template-btn ${
  type === "whatsapp" ? "active" : ""
}`}
      onClick={() => selectTemplate("whatsapp")}
    >
      <span>💬</span>
      <strong>WhatsApp</strong>
      <small>Chat QR Code</small>
    </button>

    <button
     className={`template-btn ${
  type === "wifi" ? "active" : ""
}`}
      onClick={() => selectTemplate("wifi")}
    >
      <span>📶</span>
      <strong>Wi-Fi</strong>
      <small>Wi-Fi Access</small>
    </button>

    <button
      className={`template-btn ${
  type === "contact" ? "active" : ""
}`}
      onClick={() => selectTemplate("contact")}
    >
      <span>👤</span>
      <strong>Contact</strong>
      <small>Business Card</small>
    </button>

    <button
      className={`template-btn ${
  type === "location" ? "active" : ""
}`}
      onClick={() =>selectTemplate("location")}
    >
      <span>📍</span>
      <strong>Location</strong>
      <small>Google Maps</small>
    </button>

    <button
      className={`template-btn ${
  type === "email" ? "active" : ""
}`}
      onClick={() => selectTemplate("email")}
    >
      <span>📧</span>
      <strong>Email</strong>
      <small>Email QR Code</small>
    </button>

    <button
      className={`template-btn ${
  type === "phone" ? "active" : ""
}`}
      onClick={() => selectTemplate("phone")}
    >
      <span>📞</span>
      <strong>Phone</strong>
      <small>Call QR Code</small>
    </button>

    <button
     className={`template-btn ${
  type === "sms" ? "active" : ""
}`}
      onClick={() => selectTemplate("sms")}
    >
      <span>💬</span>
      <strong>SMS</strong>
      <small>Message QR Code</small>
    </button>

  </div>

</section>


        <section className="generator">

          <div className="card input-card">

            <h2>Generate QR Code</h2>

            <label>QR Code Type</label>

            <select
              value={type}
             onChange={(e) => {
  const newType = e.target.value;

  setType(newType);
  setQrValue("");

  if (newType === "website") {
    setQrLabel("Scan Me");
  } else if (newType === "whatsapp") {
    setQrLabel("Chat on WhatsApp");
  } else if (newType === "wifi") {
    setQrLabel("Connect to Wi-Fi");
  } else if (newType === "phone") {
    setQrLabel("Call Me");
  } else if (newType === "email") {
    setQrLabel("Email Me");
  } else if (newType === "location") {
    setQrLabel("View Location");
  } else if (newType === "contact") {
    setQrLabel("Save Contact");
  } else if (newType === "sms") {
    setQrLabel("Send SMS");
  } else {
    setQrLabel("Scan Me");
  }
}}
            >

              <option value="text">
                📝 Text
              </option>

              <option value="website">
                🌐 Website
              </option>

              <option value="email">
                📧 Email
              </option>

              <option value="phone">
                ☎️ Phone
              </option>

              <option value="whatsapp">
                💬 WhatsApp
              </option>

              <option value="wifi">
                📶 Wi-Fi
              </option>

              <option value="location">
                📍 Location
              </option>

              <option value="contact">
                👤 Contact / vCard
              </option>

              <option value="sms">
                💬 SMS
              </option>

            </select>


            {renderInputFields()}


            <h3 className="custom-title">
              Customize QR
            </h3>
            <div className="label-section">

  <label>QR Label</label>

  <input
    type="text"
    value={qrLabel}
    onChange={(e) => setQrLabel(e.target.value)}
    placeholder="e.g. Scan Me"
    maxLength={40}
  />

  <label className="checkbox-label">
    <input
      type="checkbox"
      checked={showQrLabel}
      onChange={(e) => setShowQrLabel(e.target.checked)}
    />
    Show label below QR code
  </label>

</div>
            <div className="frame-section">

  <label>QR Frame Style</label>

  <div className="frame-grid">

    <button
      type="button"
      className={`frame-btn ${
        frameStyle === "classic" ? "active" : ""
      }`}
      onClick={() => setFrameStyle("classic")}
    >
      ◻️
      <span>Classic</span>
    </button>

    <button
      type="button"
      className={`frame-btn ${
        frameStyle === "rounded" ? "active" : ""
      }`}
      onClick={() => setFrameStyle("rounded")}
    >
      🔲
      <span>Rounded</span>
    </button>

    <button
      type="button"
      className={`frame-btn ${
        frameStyle === "dashed" ? "active" : ""
      }`}
      onClick={() => setFrameStyle("dashed")}
    >
      ⬚
      <span>Dashed</span>
    </button>

    <button
      type="button"
      className={`frame-btn ${
        frameStyle === "shadow" ? "active" : ""
      }`}
      onClick={() => setFrameStyle("shadow")}
    >
      ✨
      <span>Shadow</span>
    </button>

  </div>

</div>
            <div className="preset-section">

  <label>QR Style Presets</label>

  <div className="preset-grid">

    <button
      type="button"
      className={`preset-btn ${
        preset === "classic" ? "active" : ""
      }`}
      onClick={() => applyPreset("classic")}
    >
      <span className="preset-dot classic-dot"></span>
      Classic
    </button>

    <button
      type="button"
      className={`preset-btn ${
        preset === "blue" ? "active" : ""
      }`}
      onClick={() => applyPreset("blue")}
    >
      <span className="preset-dot blue-dot"></span>
      Blue
    </button>

    <button
      type="button"
      className={`preset-btn ${
        preset === "green" ? "active" : ""
      }`}
      onClick={() => applyPreset("green")}
    >
      <span className="preset-dot green-dot"></span>
      Green
    </button>

    <button
      type="button"
      className={`preset-btn ${
        preset === "purple" ? "active" : ""
      }`}
      onClick={() => applyPreset("purple")}
    >
      <span className="preset-dot purple-dot"></span>
      Purple
    </button>

    <button
      type="button"
      className={`preset-btn ${
        preset === "red" ? "active" : ""
      }`}
      onClick={() => applyPreset("red")}
    >
      <span className="preset-dot red-dot"></span>
      Red
    </button>

  </div>

</div>


            <div className="logo-upload">

              <label>QR Logo</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
              />

              {logo && (
                <div className="logo-preview">

                  <img
                    src={logo}
                    alt="QR Logo"
                  />

                  <button
                    type="button"
                    className="remove-logo-btn"
                    onClick={removeLogo}
                  >
                    Remove Logo
                  </button>

                </div>
              )}

            </div>


            {logo && (
              <>
                <label>
                  Logo Size: {logoSize}px
                </label>

                <input
                  type="range"
                  min="25"
                  max="90"
                  value={logoSize}
                  onChange={(e) =>
                    setLogoSize(
                      Number(e.target.value)
                    )
                  }
                />
              </>
            )}


            <div className="color-row">

              <div>

                <label>QR Color</label>

                <input
                  type="color"
                  value={qrColor}
                  onChange={(e) =>
                    setQrColor(e.target.value)
                  }
                />

              </div>


              <div>

                <label>Background</label>

                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) =>
                    setBgColor(e.target.value)
                  }
                />

              </div>

            </div>


            <label>
              QR Size: {qrSize}px
            </label>

            <input
              type="range"
              min="180"
              max="500"
              value={qrSize}
              onChange={(e) =>
                setQrSize(
                  Number(e.target.value)
                )
              }
            />


            <label>
              Error Correction
            </label>

            <select
              value={errorLevel}
              onChange={(e) =>
                setErrorLevel(e.target.value)
              }
            >

              <option value="L">
                Low — 7%
              </option>

              <option value="M">
                Medium — 15%
              </option>

              <option value="Q">
                Quartile — 25%
              </option>

              <option value="H">
                High — 30%
              </option>

            </select>


            <div className="generate-action">

  <button
    className="primary-btn"
    onClick={generateQR}
  >
    ⚡ Generate QR Code
  </button>

  <button
    className="secondary-btn"
    onClick={clearQR}
  >
    Clear
  </button>

</div>

          </div>


          <div className="card preview-card">

            <h2>QR Preview</h2>

            <div
  className={`qr-box qr-frame-${frameStyle}`}
  style={{
    backgroundColor: bgColor,
  }}
>

              {qrValue ? (

  <div className={`qr-result qr-frame-${frameStyle}`}>

    <QRCodeSVG
      id="qr-code"
      value={qrValue}
      size={qrSize}
      level={errorLevel}
      includeMargin={true}
      bgColor={bgColor}
      fgColor={qrColor}
      imageSettings={
        logo
          ? {
              src: logo,
              height: logoSize,
              width: logoSize,
              excavate: true,
            }
          : undefined
      }
    />

    {showQrLabel && qrLabel.trim() && (
      <div
        className="qr-label"
        style={{ color: qrColor }}
      >
        {qrLabel}
      </div>
    )}

  </div>

) : (
                <div className="qr-empty">

                  <div className="qr-placeholder-icon">
                    QR
                  </div>

                  <p>
                    Your QR code will appear here
                  </p>

                </div>

              )}

            </div>


            {qrValue && (

              <>

                <div className="action-buttons">

                  <button
                    onClick={() =>
                      downloadImage("png")
                    }
                    className="download-btn"
                  >
                    Download PNG
                  </button>


                  <button
                    onClick={() =>
                      downloadImage("jpg")
                    }
                    className="copy-btn"
                  >
                    Download JPG
                  </button>


                  <button
                    onClick={downloadSVG}
                    className="copy-btn"
                  >
                    Download SVG
                  </button>
                  <button
  onClick={downloadPDF}
  className="copy-btn"
>
  Download PDF
</button>

                </div>


                <button
                  onClick={copyContent}
                  className="copy-content-btn"
                >
                  📋 Copy Content
                </button>

              </>

            )}

          </div>

        </section>


        <section className="features">

          <div className="feature">

            <div className="feature-icon">
              ⚡
            </div>

            <h3>Fast</h3>

            <p>
              Generate QR codes instantly.
            </p>

          </div>


          <div className="feature">

            <div className="feature-icon">
              🔒
            </div>

            <h3>Private</h3>

            <p>
              Your content stays in your browser.
            </p>

          </div>


          <div className="feature">

            <div className="feature-icon">
              📱
            </div>

            <h3>Responsive</h3>

            <p>
              Works on desktop, tablet and mobile.
            </p>

          </div>

        </section>


        {/* ================= QR HISTORY ================= */}

        {history.length > 0 && (

          <section className="history-section">

            <div className="history-header">

              <div>

                <h2>
                  🕘 Recent QR Codes
                </h2>

                <p>
                  Your recently generated QR codes
                </p>

              </div>


              <button
                className="clear-history-btn"
                onClick={clearHistory}
              >
                🗑️ Clear History
              </button>

            </div>


            <div className="history-list">

              {history.map((item) => (

                <div
                  className="history-item"
                  key={item.id}
                >

                  <div className="history-info">

                    <div className="history-type">
                      {item.type.toUpperCase()}
                    </div>

                    <div className="history-value">

                      {item.value.length > 80
                        ? `${item.value.substring(
                            0,
                            80
                          )}...`
                        : item.value}

                    </div>

                    <div className="history-date">
                      {item.createdAt}
                    </div>

                  </div>


                  <div className="history-actions">
                    <button
  onClick={() => toggleFavorite(item)}
  className="favorite-history-btn"
>
  {favorites.some(
    (favorite) => favorite.value === item.value
  )
    ? "★ Favorite"
    : "☆ Favorite"}
</button>

                    <button
                      onClick={() =>
                        loadHistoryItem(item)
                      }
                      className="use-history-btn"
                    >
                      ↻ Use
                    </button>


                    <button
                      onClick={() =>
                        deleteHistoryItem(item.id)
                      }
                      className="delete-history-btn"
                    >
                      🗑️
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </section>

        )}

      </main>

{/* ================= FAVORITES ================= */}

{favorites.length > 0 && (
  <section className="favorites-section">

    <div className="history-header">
      <div>
        <h2>⭐ My Favorites</h2>
        <p>Your saved favorite QR codes</p>
      </div>
    </div>

    <div className="history-list">

      {favorites.map((item) => (
        <div
          className="history-item"
          key={item.id}
        >

          <div className="history-info">

            <div className="history-type">
              {item.type.toUpperCase()}
            </div>

            <div className="history-value">
              {item.value.length > 80
                ? `${item.value.substring(0, 80)}...`
                : item.value}
            </div>

            <div className="history-date">
              {item.createdAt}
            </div>

          </div>

          <div className="history-actions">

            <button
              onClick={() => loadHistoryItem(item)}
              className="use-history-btn"
            >
              ↻ Use
            </button>

            <button
              onClick={() => toggleFavorite(item)}
              className="favorite-history-btn"
            >
              ★ Remove
            </button>

          </div>

        </div>
      ))}

    </div>

  </section>
)}
      <footer>
        © 2026 QR Pro — Free QR Code Generator
      </footer>

    </div>
  );
}

export default App;