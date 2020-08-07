import { Component, OnInit } from '@angular/core';

import { SettingService } from '../service/setting.service';

declare function customInitFunction();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private settingService:SettingService) { }

  ngOnInit(): void {
    customInitFunction();
  }

}
