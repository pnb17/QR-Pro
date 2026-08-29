function NotFoundPage() {
  return (
    <main className="container">
      <section className="hero">
        <h1>404 - Page Not Found</h1>

        <p>
          The page you're looking for doesn't exist.
        </p>

        <a
          href="/"
          className="primary-btn"
          style={{
            display: "inline-block",
            marginTop: "16px",
            textDecoration: "none",
          }}
        >
          Back to QRForge
        </a>
      </section>
    </main>
  );
}

export default NotFoundPage;