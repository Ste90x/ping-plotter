import { useCallback, useEffect, useLayoutEffect, useState } from "react";
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
import { useRouter } from "next/router";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Log() {
  const [logData, setLogData] = useState<string[]>([]);
  const router = useRouter();
  const { logName } = router.query;

  useEffect(() => {
    fetch("/api/get-logs/" + logName)
      .then((res) => res.json())
      .then((log) => setLogData(log));
  }, []);

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
      {logData.length > 0 && (
        <Line
          options={{
            borderColor: "blue",
            color: "black",
          }}
          data={{
            labels: [...logData.map((_, index) => index + 1), "..."],
            datasets: [
              {
                data: logData.map((data) => Number(data)),
              },
            ],
          }}
        />
      )}
    </div>
  );
}
