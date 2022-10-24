import { Injectable } from '@angular/core';
import { AppSettings } from './app-settings';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
  private static s: AppSettings;

  constructor() { }

  public static loadAppSettings(appSettings: AppSettings): any {
    AppSettingsService.s = appSettings;
  }

  get keys(): AppSettings {
    return AppSettingsService.s;
  }
}
