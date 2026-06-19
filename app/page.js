"use client";

import { useState } from "react";

export default function Home() {
  const [projectId, setProjectId] = useState("");
  const [outputSummary, setOutputSummary] = useState("");
  const [feedback, setFeedback] = useState("");
  const [result, setResult] = useState(null);

  const runAlignment = async () => {
    const res = await fetch("/api/run-alignment", {
      method: "POST",
      body: JSON.stringify({ project_id: projectId })
    });
    const data = await res.json();
    setResult(data);
  };

  const runCheckOutput = async () => {
    const res = await fetch("/api/check-output", {
      method: "POST",
      body: JSON.stringify({
        project_id: projectId,
        output_summary: outputSummary,
        version: "v1"
      })
    });
    const data = await res.json();
    setResult(data);
  };

  const runFeedback = async () => {
    const res = await fetch("/api/translate-feedback", {
      method: "POST",
      body: JSON.stringify({
        project_id: projectId,
        feedback: feedback,
        version: "v1"
      })
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: '0 auto' }}>
      <h1>🚀 Agentic Creative Dashboard</h1>

      <input
        placeholder="Project ID"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
      />

      <textarea
        placeholder="Output Summary"
        value={outputSummary}
        onChange={(e) => setOutputSummary(e.target.value)}
      />

      <textarea
        placeholder="Client Feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />

      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button onClick={runAlignment}>Run Alignment</button>
        <button onClick={runCheckOutput}>Check Output</button>
        <button onClick={runFeedback}>Translate Feedback</button>
      </div>

      {result && (
        <div style={{ marginTop: 20 }}>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}