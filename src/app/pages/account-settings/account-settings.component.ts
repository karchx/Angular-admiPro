import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/service/setting.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor(private settingService:SettingService) { }

  ngOnInit() {
    this.settingService.checkCurrentTheme();
  }

  changeTheme(theme: string) {
    this.settingService.changeTheme(theme);
  }

 
}
