import React from "react";
import "./loadingOverlay.css";
import uiStore from "../../store/uiStore";

export default function LoadingOverlay() {
  const { isLoading, loadingMessage } = uiStore();

  if (!isLoading) return null;

  return (
    <div className="loading-overlay active">
      <div className="loading-box">
        <img src="/loading.gif" alt="loading" className="loading-gif" />
        <p className="loading-text">
          {loadingMessage || "Loading... Please wait"}
        </p>
      </div>
    </div>
  );
}
