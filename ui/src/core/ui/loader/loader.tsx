import * as React from "react";
import "./loader.css";

export const Loader: React.FunctionComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        placeItems: "center",
      }}
    >
      <div className="loader" />
    </div>
  );
};
