"use client";

import { useState, useRef, useCallback, type DragEvent, type ChangeEvent } from "react";
import { getSettings } from "@/lib/storage";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [resultMessage, setResultMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };
  const onDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };
  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };
  const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const removeImage = () => {
    setImage(null);
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!image) {
      setResultMessage("Please drop a screenshot first.");
      setStatus("error");
      return;
    }

    const settings = getSettings();
    if (!settings.jiraUrl || !settings.jiraApiKey || !settings.jiraEmail || !settings.jiraProject) {
      setResultMessage("Please configure your JIRA settings first (Settings tab).");
      setStatus("error");
      return;
    }
    if (!settings.groqApiKey) {
      setResultMessage("Please configure your GROQ API key first (Settings tab).");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setResultMessage("");

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image,
          notes,
          settings,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create bug report");
      }

      setStatus("success");
      setResultMessage(
        `✅ JIRA ticket created: ${data.issueKey} — ${data.issueUrl}`
      );
      setImage(null);
      setFileName("");
      setNotes("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: unknown) {
      setStatus("error");
      setResultMessage(
        `❌ ${err instanceof Error ? err.message : "Something went wrong"}`
      );
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Bug Report Enhancer</h1>

      {/* Drop Zone */}
      <div
        className={`drop-zone ${dragging ? "dragging" : ""} ${image ? "has-image" : ""}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !image && fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        id="drop-zone"
      >
        {image ? (
          <div className="preview-wrapper">
            <img src={image} alt="Screenshot preview" className="preview-image" />
            <button className="remove-image-btn" onClick={(e) => { e.stopPropagation(); removeImage(); }} title="Remove image">
              ✕
            </button>
            <span className="file-name">{fileName}</span>
          </div>
        ) : (
          <div className="drop-placeholder">
            <div className="drop-icon">📸</div>
            <p className="drop-text">Drag & Drop Screenshot Here</p>
            <p className="drop-subtext">or click to browse files</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileSelect}
          className="hidden-file-input"
          id="file-input"
        />
      </div>

      {/* Additional Notes */}
      <div className="notes-section">
        <textarea
          className="notes-input"
          placeholder="Additional Notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          id="additional-notes"
        />
      </div>

      {/* Submit Button */}
      <button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={status === "loading"}
        id="submit-button"
      >
        {status === "loading" ? (
          <span className="btn-loading">
            <span className="spinner" />
            Analyzing &amp; Pushing to JIRA…
          </span>
        ) : (
          "Analyze and push to JIRA"
        )}
      </button>

      {/* Result */}
      {resultMessage && (
        <div className={`result-banner ${status}`} id="result-message">
          {resultMessage}
        </div>
      )}
    </div>
  );
}
