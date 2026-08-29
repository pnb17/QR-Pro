import { useEffect, useState } from "react";

import { QRCodeSVG } from "qrcode.react";
import "./App.css";

function App() {
    // Legal / Information Pages
  const [activeInfoPage, setActiveInfoPage] = useState(null);
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

  // Email
const [emailSubject, setEmailSubject] = useState("");
const [emailMessage, setEmailMessage] = useState("");
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

  const email = value.trim();
  const subject = emailSubject.trim();
  const message = emailMessage.trim();

  let mailto = `mailto:${email}`;

  const params = [];

  if (subject) {
    params.push(`subject=${encodeURIComponent(subject)}`);
  }

  if (message) {
    params.push(`body=${encodeURIComponent(message)}`);
  }

  if (params.length > 0) {
    mailto += `?${params.join("&")}`;
  }

  return mailto;
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
  const itemToDelete = history.find(
    (item) => item.id === id
  );

  const updatedHistory = history.filter(
    (item) => item.id !== id
  );

  setHistory(updatedHistory);

  localStorage.setItem(
    "qrHistory",
    JSON.stringify(updatedHistory)
  );

  // Remove the same QR from Favorites
  if (itemToDelete) {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.value !== itemToDelete.value
    );

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "qrFavorites",
      JSON.stringify(updatedFavorites)
    );
  }
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
    event.target.value = "";
    return;
  }

  // Maximum logo size: 2 MB
  const maxSize = 2 * 1024 * 1024;

  if (file.size > maxSize) {
    alert("Logo image must be smaller than 2 MB.");
    event.target.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    setLogo(reader.result);
  };

  reader.onerror = () => {
    alert("Unable to read the logo image.");
    event.target.value = "";
  };

  reader.readAsDataURL(file);
};

const removeLogo = () => {
  setLogo("");
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
// ==============================
// Download PDF
// ==============================
const downloadPDF = async () => {
  const qrContainer = document.querySelector(".qr-result");

  if (!qrContainer) return;

  const svg = qrContainer.querySelector("#qr-code");

  if (!svg) return;

  const svgData =
    new XMLSerializer().serializeToString(svg);

  // High-resolution PDF source
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  const width = 2400;
  const height =
    showQrLabel && qrLabel.trim()
      ? 2700
      : 2400;

  canvas.width = width;
  canvas.height = height;

  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  const img = new Image();

  img.onload = async () => {
    // High-resolution QR
    const qrSize = 2000;

    const x =
      (canvas.width - qrSize) / 2;

    const y = 100;

    ctx.drawImage(
      img,
      x,
      y,
      qrSize,
      qrSize
    );

    // QR Label
    if (
      showQrLabel &&
      qrLabel.trim()
    ) {
      ctx.fillStyle = qrColor;
      ctx.font = "bold 96px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(
        qrLabel.trim(),
        canvas.width / 2,
        2260
      );
    }

    const imageData =
      canvas.toDataURL("image/png");

    // A4 PDF
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const pageWidth = 210;
    const pageHeight = 297;

    const pdfWidth = 170;

    const pdfHeight =
      (canvas.height /
        canvas.width) *
      pdfWidth;

    const xPdf =
      (pageWidth - pdfWidth) / 2;

    const yPdf =
      (pageHeight - pdfHeight) / 2;

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

  img.onerror = () => {
    alert(
      "Unable to create QR PDF."
    );
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

  const svg = qrContainer.querySelector("#qr-code");

  if (!svg) return;

  // High-resolution export
  const width = 2400;
  const height =
    showQrLabel && qrLabel.trim()
      ? 2700
      : 2400;

  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // Convert SVG to image
  const source =
    new XMLSerializer().serializeToString(svg);

  const svgBlob = new Blob(
    [source],
    {
      type: "image/svg+xml;charset=utf-8",
    }
  );

  const url =
    URL.createObjectURL(svgBlob);

  const image = new Image();

  image.onload = () => {
    // High-resolution QR
    const qrDrawSize = 2000;

    const x =
      (width - qrDrawSize) / 2;

    const y = 100;

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
      ctx.font = "bold 96px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(
        qrLabel.trim(),
        width / 2,
        2260
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

    const imageURL =
      canvas.toDataURL(
        mimeType,
        0.95
      );

    const link =
      document.createElement("a");

    link.href = imageURL;

    link.download =
      `qr-code.${extension}`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  image.onerror = () => {
    URL.revokeObjectURL(url);

    alert(
      "Unable to create QR image."
    );
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
              case "email":
        return (
          <div className="extra-fields">

            <label>Email Address</label>

            <input
              type="email"
              value={value}
              onChange={(e) =>
                setValue(e.target.value)
              }
              placeholder="example@email.com"
            />

            <label>Email Subject</label>

            <input
              type="text"
              value={emailSubject}
              onChange={(e) =>
                setEmailSubject(e.target.value)
              }
              placeholder="e.g. QRForge Test"
            />

            <label>Email Message</label>

            <textarea
              value={emailMessage}
              onChange={(e) =>
                setEmailMessage(e.target.value)
              }
              placeholder="Enter your message..."
              rows="5"
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

          <span>QRForge</span>

        </div>

        <div className="header-badge">
          Free QR Code Generator
        </div>

      </header>


      <main className="container">

        <section className="hero">

          <h1>Free QR Code Generator Online</h1>

          <p>
  Create free QR codes for URLs, WhatsApp, WiFi, email,
  phone, SMS, locations and contacts. Customize colors,
  size and logo, then download your QR code instantly.
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
            aria-label="QR code type"
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
                aria-label="QR code size"
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
                  aria-label="QR code color"
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
                  aria-label="QR code background color"
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
              aria-label="QR code size"
            />


            <label>
              Error Correction
            </label>

           <select
  aria-label="QR code error correction level"
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

{/* ================= INFO / LEGAL PAGES ================= */}

{activeInfoPage && (
  <section className="info-page">
    <div className="info-page-card">

      <div className="info-page-header">
        <h2>
          {activeInfoPage === "about" && "About QRForge"}
          {activeInfoPage === "privacy" && "Privacy Policy"}
          {activeInfoPage === "terms" && "Terms of Use"}
        </h2>

        
      </div>

      {activeInfoPage === "about" && (
        <div className="info-page-content">
        
          <p className="info-tagline">
  Create. Customize. Share.
</p>

<p>
  QRForge is a fast, simple, and privacy-friendly QR code generator
  designed to make creating professional QR codes effortless.
</p>

<p>
  Create QR codes for websites, WhatsApp, Wi-Fi networks, email,
  phone numbers, SMS, locations, contact details, and more — all
  directly from your browser.
</p>

<p>
  Personalize your QR codes with custom colors, backgrounds, logos,
  labels, frame styles, and error correction settings. When your QR
  code is ready, download it in high-quality PNG, JPG, SVG, or PDF
  format for digital or print use.
</p>

<p>
  QRForge is built with privacy in mind. Your QR code content is
  processed in your browser, helping you create and customize QR
  codes quickly without unnecessary complexity.
</p>
        </div>
      )}

      {activeInfoPage === "privacy" && (
        <div className="info-page-content">
          <p className="policy-updated">
  Last updated: August 22, 2026
</p>
         <p>
  At QRForge, your privacy is important to us. QRForge is designed to
  create and customize QR codes directly in your browser, allowing you
  to use the core QR generation features without creating an account.
</p>

<h3>Local Data Processing</h3>

<p>
  QR code content you enter, including URLs, text, Wi-Fi details,
  contact information, phone numbers, email addresses, SMS content,
  and other QR data, is processed locally in your browser for QR code
  generation.
</p>

<h3>QR History and Favorites</h3>

<p>
  Your recently generated QR codes and favorites may be stored locally
  on your device using your browser's localStorage. This information
  remains in your browser and can be removed by clearing your QR
  history, favorites, or browser storage.
</p>

<h3>Uploaded Logos</h3>

<p>
  Images or logos you select for QR code customization are processed
  in your browser as part of the QR creation process. QRForge does not
  intentionally upload these files to a server for QR generation.
</p>

<h3>Cookies and Analytics</h3>

<p>
  QRForge currently does not require cookies for its core QR code
  generation features. If analytics, advertising, or other third-party
  services are introduced in the future, this Privacy Policy will be
  updated to explain how those services may collect or process data.
</p>

<h3>Third-Party Links</h3>

<p>
  QRForge may contain links to third-party websites or services. We are
  not responsible for the privacy practices, content, or policies of
  those third-party services.
</p>

<h3>Changes to This Privacy Policy</h3>

<p>
  We may update this Privacy Policy from time to time as QRForge
  develops or new features are introduced. Any updates will be reflected
  on this page.
</p>
        </div>
      )}

      {activeInfoPage === "terms" && (
        <div className="info-page-content">
          <p className="policy-updated">
  Last updated: August 22, 2026
</p>

<p>
  Welcome to QRForge. By accessing or using QRForge, you agree to these
  Terms of Use. Please read them carefully before using the service.
</p>

<h3>Use of QRForge</h3>

<p>
  QRForge provides tools for creating, customizing, and downloading QR
  codes for personal, educational, business, and other lawful purposes.
  You may use the service without creating an account.
</p>

<h3>User Responsibility</h3>

<p>
  You are responsible for the information, links, contact details,
  images, logos, and other content you use to create QR codes. You should
  verify the accuracy of your QR code and test it before printing,
  publishing, distributing, or using it commercially.
</p>

<h3>Prohibited Use</h3>

<p>
  You must not use QRForge to create or distribute QR codes containing
  unlawful, fraudulent, deceptive, harmful, malicious, or unauthorized
  content. You must also respect applicable laws and the intellectual
  property, privacy, and other rights of third parties.
</p>

<h3>QR Code Accuracy and Compatibility</h3>

<p>
  QRForge is designed to generate functional QR codes, but successful
  scanning may depend on factors such as QR size, colors, contrast,
  embedded logos, error correction settings, printing quality, scanning
  devices, and QR reader applications. We recommend testing every QR
  code before final use.
</p>

<h3>Intellectual Property</h3>

<p>
  QRForge and its website design, branding, interface, and original
  website content are protected by applicable intellectual property
  laws. Content that you enter or upload remains your responsibility,
  and you should only use content that you have the right to use.
</p>

<h3>Service Availability</h3>

<p>
  We may update, improve, modify, suspend, or discontinue features of
  QRForge at any time. We do not guarantee that every feature will
  always be available or operate without interruption.
</p>

<h3>Disclaimer</h3>

<p>
  QRForge is provided on an "as is" and "as available" basis. While we
  aim to provide a reliable and useful QR code generation service, we do
  not guarantee that the service will always be error-free,
  uninterrupted, or suitable for every particular purpose.
</p>

<h3>Limitation of Liability</h3>

<p>
  To the extent permitted by applicable law, QRForge will not be liable
  for indirect, incidental, special, or consequential losses arising
  from the use of the service, generated QR codes, unavailable features,
  incorrect user-provided information, or third-party content.
</p>

<h3>Third-Party Services</h3>

<p>
  QRForge may contain links to or interact with third-party websites,
  applications, or services. We are not responsible for the content,
  availability, security, terms, or practices of those third parties.
</p>

<h3>Changes to These Terms</h3>

<p>
  We may update these Terms of Use as QRForge develops or new features
  are introduced. Updated terms will be published on this page with a
  revised "Last updated" date. Continued use of QRForge after an update
  means that the revised terms apply to your continued use of the
  service.
</p>
        </div>
      )}
<button
          type="button"
          className="info-close-btn"
          onClick={() => setActiveInfoPage(null)}
        >
          Close
        </button>
    </div>
  </section>
)}
{/* ================= SEO CONTENT ================= */}

<section className="seo-content">
  <h2>Free Online QR Code Generator</h2>

  <p>
    QRForge is a free online QR code generator that helps you create
    customizable QR codes quickly and easily. Generate QR codes for
    websites, WhatsApp, WiFi, email, phone numbers, SMS, locations,
    contacts and more.
  </p>
  <p className="seo-tool-link">
  Need a QR code for WhatsApp?{" "}
  <a href="/whatsapp-qr-code-generator">
    Create a free WhatsApp QR Code
  </a>
  .
</p>
<p className="seo-tool-link">
  Want to share your WiFi easily?{" "}
  <a href="/wifi-qr-code-generator">
    Create a free WiFi QR Code
  </a>
  .
</p>
<p className="seo-tool-link">
  Need a website QR?{" "}
  <a href="/url-qr-code-generator">
    Create a free URL QR Code
  </a>.
</p>
<p className="seo-tool-link">
  Want to make emailing easier?{" "}
  <a href="/email-qr-code-generator">
    Create a free Email QR Code
  </a>.
</p>
<p className="seo-tool-link">
  Need a QR code for calling?{" "}
  <a href="/phone-qr-code-generator">
    Create a free Phone QR Code
  </a>.
</p>

<p className="seo-tool-link">
  Want to create an SMS QR?{" "}
  <a href="/sms-qr-code-generator">
    Create a free SMS QR Code
  </a>.
</p>
<p className="seo-tool-link">
  Need to share a place?{" "}
  <a href="/location-qr-code-generator">
    Create a free Location QR Code
  </a>.
</p>

<p className="seo-tool-link">
  Want to share contact details?{" "}
  <a href="/contact-qr-code-generator">
    Create a free Contact QR Code
  </a>.
</p>

  <h2>What is a QR Code Generator?</h2>

  <p>
    A QR code generator is an online tool that converts information
    such as a website URL, text, contact details or WiFi credentials
    into a scannable QR code. Users can scan the QR code with a
    smartphone camera to access the information instantly.
  </p>
  <h2>How to Create a QR Code</h2>

<ol className="seo-steps">
  <li>
    <strong>Choose a QR code type.</strong> Select URL, WhatsApp,
    WiFi, email, phone, SMS, location, contact or another available
    option.
  </li>

  <li>
    <strong>Enter your information.</strong> Add the content you want
    people to access when they scan your QR code.
  </li>

  <li>
    <strong>Customize your QR code.</strong> Adjust the colors, size,
    error correction level and add a logo if needed.
  </li>

  <li>
    <strong>Generate and test.</strong> Create your QR code and scan it
    with your phone to make sure it works correctly.
  </li>

  <li>
    <strong>Download your QR code.</strong> Save it in your preferred
    available format and use it online or in print.
  </li>
</ol>
<h2>Frequently Asked Questions</h2>

<div className="seo-faq">
  <div className="seo-faq-item">
    <h3>Is QRForge free to use?</h3>
    <p>
      Yes. QRForge lets you create and download QR codes online for free.
    </p>
  </div>

  <div className="seo-faq-item">
    <h3>What types of QR codes can I create?</h3>
    <p>
      You can create QR codes for URLs, text, WhatsApp, WiFi, email,
      phone numbers, SMS, locations and contact information.
    </p>
  </div>

  <div className="seo-faq-item">
    <h3>Can I customize my QR code?</h3>
    <p>
      Yes. You can customize QR code colors, background, size and error
      correction level, and you can also add a logo.
    </p>
  </div>

  <div className="seo-faq-item">
    <h3>Do I need to create an account?</h3>
    <p>
      No. You can use the QR code generator without creating an account.
    </p>
  </div>

  <div className="seo-faq-item">
    <h3>Should I test my QR code before using it?</h3>
    <p>
      Yes. Always scan your QR code with a smartphone before printing
      or sharing it to make sure the encoded information works correctly.
    </p>
  </div>
</div>
</section>

{/* ================= FOOTER ================= */}

<footer>
  <div className="footer-content">
    <p>© 2026 QRForge — Free QR Code Generator</p>

    <div className="footer-links">

      <button
        type="button"
        onClick={() => setActiveInfoPage("about")}
      >
        About
      </button>

      <button
        type="button"
        onClick={() => setActiveInfoPage("privacy")}
      >
        Privacy Policy
      </button>

      <button
        type="button"
        onClick={() => setActiveInfoPage("terms")}
      >
        Terms of Use
      </button>

    </div>
  </div>
</footer>

    </div>
  );
}

export default App;

   
    