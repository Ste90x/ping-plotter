import fs from "fs";

const logsDir = "./logs";

export const getLogs = () => {
  const contentsOfLogsDir = fs.readdirSync(logsDir);
  console.log(contentsOfLogsDir);
  return contentsOfLogsDir;
};

export const readLog = (fileName: string) => {
  let contentsOfFile = Buffer.from(
    fs.readFileSync(logsDir + "/" + fileName)
  ).toString();
  console.log(contentsOfFile);
  return JSON.parse(contentsOfFile);
};
