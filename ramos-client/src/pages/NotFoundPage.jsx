import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.errorCode}>404</h1>
        <h2 style={styles.heading}>MISSION FAILED</h2>
        <div style={styles.divider}></div>
        <p style={styles.text}>
          The link you followed to get here must be broken, or the page has been moved to a different server.
        </p>
        <Link to="/" style={styles.button}>
          Return to Base
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f2027, #203a43, #042736)",
    color: "#fff",
    fontFamily: "sans-serif",
    textAlign: "center",
    padding: "20px"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px"
  },
  errorCode: {
    fontSize: "8rem",
    fontWeight: "900",
    margin: "0",
    color: "#00ffcc",
    textShadow: "0 0 25px rgba(0, 255, 204, 0.6)",
    lineHeight: "1"
  },
  heading: {
    fontSize: "1.8rem",
    textTransform: "uppercase",
    letterSpacing: "4px",
    margin: "0",
    color: "#fff"
  },
  divider: {
    height: "3px",
    width: "80px",
    background: "#00ffcc",
    borderRadius: "2px",
    margin: "10px 0"
  },
  text: {
    maxWidth: "400px",
    color: "#ccc",
    lineHeight: "1.6",
    fontSize: "1rem"
  },
  button: {
    marginTop: "20px",
    padding: "12px 30px",
    background: "rgba(0, 255, 204, 0.1)",
    color: "#00ffcc",
    border: "2px solid #00ffcc",
    borderRadius: "50px",
    textDecoration: "none",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "2px",
    transition: "all 0.3s ease",
    boxShadow: "0 0 15px rgba(0, 255, 204, 0.2)"
  }
};

export default NotFoundPage;