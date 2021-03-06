import yargs from "yargs";
import fs from "fs";
import path from "path";
import yaml from "yaml";

export const args = yargs
  .option("allowed-clients", {
    describe: "origins from which requests are allowed separated by space",
    type: "string",
  })
  .option("port", {
    describe: "server port to listen for connections",
    type: "number",
    default: 4000,
  })
  .option("buffer-size", {
    describe: "number of messages to store on server",
    type: "number",
    default: 2000,
  })
  .option("users-limit", {
    describe: "maximum number of users on server",
    type: "number",
    default: 100,
  })
  .config("config", "yaml configuration file", (filePath) => {
    const content = fs.readFileSync(path.resolve(filePath), "utf-8");
    return yaml.parse(content);
  })
  .env("SERVER")
  .strict()
  .parseSync();
