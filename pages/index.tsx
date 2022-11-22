import { useCallback, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MINUTES_TO_BE_LOGGED = 1;

export default function Home() {
  const [results, setResults] = useState<string[]>([]);

  const trigger = useCallback(
    (minutes: number) =>
      fetch(`/api/trigger-ping?minutes=${minutes}`)
        .then((res) => res.json())
        .then((res) => {
          setResults(res);
          console.log(res);
        }),
    []
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "98vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        style={{
          height: "5rem",
          width: "15rem",
        }}
        onClick={() => trigger(MINUTES_TO_BE_LOGGED)}
      >
        TRIGGER PING LOGGING
      </button>
      {results.length > 0 && (
        <Line
          options={{
            borderColor: "blue",
            color: "black",
          }}
          data={{
            labels: [...results.map((_, index) => index + 1), "..."],
            datasets: [
              {
                data: results.map((data) => Number(data)),
              },
            ],
          }}
        />
      )}
    </div>
  );
}
