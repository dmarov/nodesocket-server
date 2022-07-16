import yargs from "yargs";
import fs from "fs";
import path from "path";
import yaml from "yaml";

export const args = yargs
  .option("cors", {
    describe: "domains from which requests are allowed",
    type: "string",
  })
  .config("config", "yaml configuration file", (filePath) => {
    const content = fs.readFileSync(path.resolve(filePath), "utf-8");
    return yaml.parse(content);
  })
  .strict()
  .parseSync();
