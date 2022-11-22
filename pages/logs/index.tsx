import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Logs() {
  const [logs, setLogs] = useState<string[]>([]);
  const router = useRouter();
  const { push } = router;

  useEffect(() => {
    fetch("/api/get-logs")
      .then((res) => res.json())
      .then((logs) => setLogs(logs));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "98vh",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      {logs.map((log, index) => (
        <button key={index} onClick={() => push("./logs/" + log)}>
          {log}
        </button>
      ))}
    </div>
  );
}
