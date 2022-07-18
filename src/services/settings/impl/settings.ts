import { injectable } from "inversify";
import { ApiSettings } from "../../../models/api/api-settings";
import { args } from "../../../utils/args";
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
