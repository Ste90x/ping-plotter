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

export default function Home() {
  const [results, setResults] = useState<string[]>([]);
  const [minutes, setMinutes] = useState<number>(1)

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

  const handleMinutesInput = useCallback((event: any) => {
    setMinutes(event.target.value)
  }, [])

  return (
    <>
      <nav>
        <a href="/logs">GO TO LOGS</a>
      </nav>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "98vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input type="number" value={minutes} onChange={handleMinutesInput} />
        <button
          style={{
            height: "5rem",
            width: "15rem",
          }}
          onClick={() => trigger(minutes)}
        >
          TRIGGER PING LOGGING
        </button>
        {/* show some kind of timer */}
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
    </>
  );
}
