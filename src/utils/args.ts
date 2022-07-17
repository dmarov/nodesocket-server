import yargs from "yargs";
import fs from "fs";
import path from "path";
import yaml from "yaml";

export const args = yargs
  .option("allowed-clients", {
    describe: "domains from which requests are allowed",
    type: "string",
  })
  .option("port", {
    describe: "server port to listen for connections",
    type: "number",
  })
  .config("config", "yaml configuration file", (filePath) => {
    const content = fs.readFileSync(path.resolve(filePath), "utf-8");
    return yaml.parse(content);
  })
  .strict()
  .parseSync();
