import React from "react";

// Centralized styles for the Lebenslauf component
const styles = {
  headerContainer: { maxWidth: "1500px" } as React.CSSProperties,
  headerBar: { bottom: "-16px" } as React.CSSProperties,
  pageContainer: { maxWidth: "1400px" } as React.CSSProperties,
  avatar: { width: "100%" } as React.CSSProperties,
  progressBar: (percent: number): React.CSSProperties => ({
    width: `${percent}%`,
  }),
  langBar: (percent: number): React.CSSProperties => ({
    height: "24px",
    width: `${percent}%`,
  }),
};

export default styles;
