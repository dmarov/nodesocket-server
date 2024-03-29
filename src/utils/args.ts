import yargs from "yargs";
import fs from "fs";
import path from "path";
import yaml from "yaml";

export const args = yargs
  .option("allowed-clients", {
    describe: "origins from which requests are allowed separated by space",
    type: "string",
  })
  .option("address", {
    describe: "server port to listen for connections",
    type: "string",
    default: "0.0.0.0",
  })
  .option("port", {
    describe: "server port to listen for connections",
    type: "number",
    default: 80,
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
  .option("msg-min-length", {
    describe: "minimum number of characters in message",
    type: "number",
    default: 3,
  })
  .option("msg-max-length", {
    describe: "maximum number of characters in message",
    type: "number",
    default: 200,
  })
  .config("config", "yaml configuration file", (filePath) => {
    const fullPath = path.resolve(filePath);
    const content = fs.readFileSync(fullPath, "utf-8");

    return yaml.parse(content);
  })
  .env("SERVER")
  .strict()
  .parseSync();
