import cp from "child_process";
import { DateTime } from "luxon";
import { createLogsOfPingData } from "./createLogsOfPingData";

export const triggerPinging = (minutes: number = 1): Promise<string[]> => {
  const TIME = minutes * 1000 * 60;
  const pingCP = cp.spawn("ping", ["google.com"]);
  console.log(
    `ping child process started for ${minutes} minute(s) with process id:`,
    pingCP.pid
  );

  let dataDump: string[] = [];
  pingCP.stdout.on("data", (data) => {
    console.log(`${DateTime.now().toLocal().toISOTime()}: ${data}`);
    dataDump.push(data.toString());
  });

  pingCP.stdout.on("close", () =>
    console.log(`Child process with pid ${pingCP.pid} closed after ${TIME}ms.`)
  );

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      process.kill(pingCP.pid!);
      const filteredData = filterPingData(dataDump);
      console.log("collectedAndFilteredData", filteredData);
      createLogsOfPingData(filteredData);
      return resolve(filteredData);
    }, TIME);
  });
};

function filterPingData(data: string[]) {
  return data
    .flatMap((pingString) => pingString.split(" "))
    .filter((item) => item.startsWith("time"))
    .flatMap((timeVal) =>
      timeVal
        .split("=")
        .filter((timeSubString) => !timeSubString.includes("time"))
    );
}
