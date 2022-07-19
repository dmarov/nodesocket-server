import { ApiSettings } from "@/models/api/api-settings";

export interface SettingsInterface {
  getSettings(): ApiSettings;
}
