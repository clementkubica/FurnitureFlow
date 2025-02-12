import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingScreen({ text }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <CircularProgress style={{ color: "#e6dff1" }} size={60} />
      <p style={{ marginTop: "20px", fontSize: "1.5rem", color: "grey" }}>
        {text}
      </p>
    </div>
  );
}
