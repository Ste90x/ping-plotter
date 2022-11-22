import fs from "fs";
import { DateTime } from "luxon";

export function createLogsOfPingData(filteredData: string[]) {
  const currentTimeStamp = DateTime.now().toUTC().toISO();
  console.log(currentTimeStamp);

  let logsDir = "./logs";

  if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

  fs.writeFileSync(
    `${logsDir}/ping_logs_${currentTimeStamp}.txt`,
    JSON.stringify(filteredData)
  );
}
