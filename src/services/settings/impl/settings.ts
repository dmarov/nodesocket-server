import { injectable } from "inversify";
import { ApiSettings } from "@/models/api";
import { args } from "@/utils";
import { SettingsInterface } from "../settings";

@injectable()
export class SettingsService implements SettingsInterface {
  getSettings(): ApiSettings {
    return {
      messages: {
        bufferSize: args.bufferSize,
      },
    };
  }
}
