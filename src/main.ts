import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppSettings } from './app/users/shared-modules/services/app-settings/app-settings';
import { AppSettingsService } from './app/users/shared-modules/services/app-settings/app-settings.service';
import { environment } from './environments/environment';
import settings from './settings/appsettings.json'

if (environment.production) {
  enableProdMode();
}
AppSettingsService.loadAppSettings(settings as AppSettings);
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
