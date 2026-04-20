import React, { useState } from "react";
import { evaluatePromptStream } from "../fetchers/quiz-api";
import Loader from "../components/common/loader";

const PromptEvaluation: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lastRunAt, setLastRunAt] = useState<number | null>(null);

  const handleRunEval = async () => {
    setRunning(true);
    setResults([]);
    setError(null);
    setLastRunAt(null);

    try {
      await evaluatePromptStream(
        (result) => setResults((prev) => [...prev, result]),
        (_id, timestamp) => setLastRunAt(timestamp),
        (message) => setError(message)
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setRunning(false);
    }
  };

  const summary =
    results.length > 0
      ? {
          total: results.length,
          failed: results.filter((r: any) => r.status === "FAIL" || r.status === "ERROR").length,
          avgScore: results.reduce((sum: number, r: any) => sum + r.score, 0) / results.length,
        }
      : null;

  return (
    <div
      style={{
        padding: "6rem 2rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1>Prompt Evaluation Lab</h1>
        <button
          onClick={handleRunEval}
          disabled={running}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#4a90e2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: running ? "not-allowed" : "pointer",
          }}
        >
          {running ? "Running Evaluation..." : "Run New Evaluation"}
        </button>
      </div>

      {error && (
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#fee2e2",
            color: "#dc2626",
            borderRadius: "4px",
            marginBottom: "1rem",
          }}
        >
          Error: {error}
        </div>
      )}

      {summary && (
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
          <div
            style={{
              flex: 1,
              padding: "1rem",
              backgroundColor: "#f1f5f9",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
              {summary.total}
              {running && (
                <span style={{ fontSize: "1rem", color: "#94a3b8", marginLeft: "0.4rem" }}>…</span>
              )}
            </div>
            <div style={{ color: "#64748b", fontSize: "0.85rem" }}>Tests Completed</div>
          </div>
          <div
            style={{
              flex: 1,
              padding: "1rem",
              backgroundColor: summary.failed > 0 ? "#fff1f2" : "#f0fdf4",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: summary.failed > 0 ? "#dc2626" : "#16a34a",
              }}
            >
              {summary.failed}
            </div>
            <div style={{ color: "#64748b", fontSize: "0.85rem" }}>Critical Failures</div>
          </div>
          <div
            style={{
              flex: 1,
              padding: "1rem",
              backgroundColor: "#eff6ff",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#2563eb" }}>
              {summary.avgScore.toFixed(1)}
            </div>
            <div style={{ color: "#64748b", fontSize: "0.85rem" }}>Average Score / 10</div>
          </div>
        </div>
      )}

      {!running && lastRunAt && (
        <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
          Last run: {new Date(lastRunAt).toLocaleString()}
        </p>
      )}

      {running && results.length === 0 && <Loader />}

      {results.length > 0 && (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {results.map((res: any, idx: number) => (
            <div
              key={idx}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "1.5rem",
                backgroundColor:
                  res.status === "ERROR"
                    ? "#fff7ed"
                    : res.score >= 8
                      ? "#f0fdf4"
                      : res.score >= 4
                        ? "#fefce8"
                        : "#fff1f2",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <h3 style={{ margin: 0 }}>{res.testName}</h3>
                <span
                  style={{
                    fontWeight: "bold",
                    color:
                      res.status === "ERROR"
                        ? "#ea580c"
                        : res.score >= 8
                          ? "#16a34a"
                          : res.score >= 4
                            ? "#ca8a04"
                            : "#dc2626",
                  }}
                >
                  {res.status === "FAIL" ? "FAIL — " : res.status === "ERROR" ? "ERROR — " : ""}
                  {res.score.toFixed(1)}/10
                  {res.status !== "ERROR" && (
                    <span style={{ fontSize: "0.75rem", marginLeft: "0.4rem", opacity: 0.85 }}>
                      ({res.score >= 8 ? "HIGH" : res.score >= 4 ? "AVERAGE" : "LOW"})
                    </span>
                  )}
                </span>
              </div>
              <p
                style={{
                  margin: "0 0 1rem",
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  fontStyle: "italic",
                }}
              >
                {res.scenario}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.5rem",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <h4 style={{ margin: "0 0 0.5rem" }}>Prompt Input</h4>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "#374151",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.25rem",
                    }}
                  >
                    <span>
                      <strong>Category:</strong> {res.input.category}
                    </span>
                    <span>
                      <strong>Complexity:</strong> {res.input.complexity}
                    </span>
                    <span>
                      <strong>Language:</strong> {res.input.language}
                    </span>
                    {res.input.customUserPrompt && (
                      <span>
                        <strong>Custom prompt:</strong> {res.input.customUserPrompt}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h4 style={{ margin: "0 0 0.5rem" }}>Solution Criteria</h4>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "#374151",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.25rem",
                    }}
                  >
                    <span>
                      <strong>Questions:</strong> {res.criteria.minQuestions}–
                      {res.criteria.maxQuestions}
                    </span>
                    <span>
                      <strong>Hint length:</strong> max 30 chars
                    </span>
                  </div>
                </div>
              </div>

              {res.error && (
                <div style={{ color: "#ea580c", fontSize: "0.875rem", marginBottom: "1rem" }}>
                  <strong>Error:</strong> {res.error}
                </div>
              )}

              {res.details && (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                    <div>
                      <h4 style={{ margin: "0 0 0.5rem" }}>Deterministic Checks</h4>
                      <ul style={{ paddingLeft: "1.2rem", margin: 0, fontSize: "0.875rem" }}>
                        <li>
                          Question Count:{" "}
                          {res.details.criticalErrors.some((e: string) =>
                            e.includes("Count mismatch")
                          )
                            ? "❌"
                            : "✅"}
                        </li>
                        <li>
                          Hint Lengths:{" "}
                          {res.details.warnings.some((e: string) => e.includes("hint too long"))
                            ? "❌"
                            : "✅"}
                        </li>
                        <li>Compliance Score: {res.details.complianceScore}/10</li>
                      </ul>
                      {res.details.criticalErrors.length > 0 && (
                        <div style={{ color: "#dc2626", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                          {res.details.criticalErrors.join(", ")}
                        </div>
                      )}
                      {res.details.warnings.length > 0 && (
                        <div
                          style={{ color: "#ca8a04", fontSize: "0.85rem", marginTop: "0.25rem" }}
                        >
                          {res.details.warnings.join(", ")}
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 style={{ margin: "0 0 0.5rem" }}>Score Breakdown</h4>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.25rem",
                        }}
                      >
                        <span>
                          Compliance <span style={{ color: "#94a3b8" }}>(15%)</span>:{" "}
                          {res.details.complianceScore}/10
                        </span>
                        <span>
                          Relevance <span style={{ color: "#94a3b8" }}>(20%)</span>:{" "}
                          {res.details.semantic.relevance}/10
                        </span>
                        <span>
                          Difficulty <span style={{ color: "#94a3b8" }}>(35%)</span>:{" "}
                          {res.details.semantic.difficultyMatch}/10
                        </span>
                        <span>
                          Tone <span style={{ color: "#94a3b8" }}>(15%)</span>:{" "}
                          {res.details.semantic.tone}/10
                        </span>
                        <span>
                          Language <span style={{ color: "#94a3b8" }}>(15%)</span>:{" "}
                          {res.details.semantic.language}/10
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "1rem",
                      padding: "0.75rem 1rem",
                      backgroundColor: "#f8fafc",
                      borderLeft: "3px solid #4a90e2",
                      borderRadius: "0 4px 4px 0",
                    }}
                  >
                    <h4
                      style={{
                        margin: "0 0 0.4rem",
                        fontSize: "0.875rem",
                        color: "#4a90e2",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      How to improve your prompt
                    </h4>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "#374151",
                        lineHeight: "1.6",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.25rem",
                      }}
                    >
                      {res.details.semantic.reasoning
                        .split("\n")
                        .filter((line: string) => line.trim())
                        .map((line: string, i: number) => (
                          <span key={i}>{line.trim()}</span>
                        ))}
                    </div>
                  </div>

                  <details style={{ marginTop: "1rem" }}>
                    <summary style={{ cursor: "pointer", color: "#4a90e2", fontSize: "0.875rem" }}>
                      View Output (Generated Quiz)
                    </summary>
                    <pre
                      style={{
                        backgroundColor: "#f9fafb",
                        padding: "1rem",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                        overflowX: "auto",
                        marginTop: "0.5rem",
                      }}
                    >
                      {JSON.stringify(res.details.quizPreview, null, 2)}
                    </pre>
                  </details>
                </>
              )}
            </div>
          ))}

          {running && (
            <div
              style={{
                border: "1px dashed #e5e7eb",
                borderRadius: "8px",
                padding: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                color: "#94a3b8",
              }}
            >
              <Loader />
              <span style={{ fontSize: "0.875rem" }}>Running next test...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PromptEvaluation;
