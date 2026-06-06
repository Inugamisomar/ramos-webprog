function Footer() {
  return (
    <footer style={styles.footer}>
      <h2 style={styles.logo}>🎮 LEO GAMING</h2>

      <p style={styles.tagline}>
        Level up your skill, master the game. 🕹️🔥
      </p>

      <div style={styles.items}>
        <span style={styles.item}>🏠 Home</span>
        <span style={styles.item}>🎯 Guides</span>
        <span style={styles.item}>💬 Community</span>
        <span style={styles.item}>📞 Contact</span>
      </div>

      <p style={styles.copy}>
        © {new Date().getFullYear()} LEO GAMING | GGWAP 🎉
      </p>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: "auto",
    padding: "25px",
    background: "linear-gradient(135deg, #0f2027, #203a43, #042736)",
    color: "#fff",
    textAlign: "center",
    borderTop: "3px solid #00ffcc",
    boxShadow: "0 -2px 10px rgba(0,255,204,0.3)"
  },
  logo: {
    margin: "0",
    color: "#00ffcc",
    letterSpacing: "2px"
  },
  tagline: {
    fontStyle: "italic",
    margin: "10px 0",
    color: "#ccc"
  },
  items: {
    margin: "15px 0"
  },
  item: {
    margin: "0 12px",
    color: "#00ffcc",
    fontWeight: "bold"
  },
  copy: {
    fontSize: "12px",
    opacity: "0.7",
    marginTop: "10px"
  }
};

export default Footer;