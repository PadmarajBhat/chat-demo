import { Component, OnInit } from '@angular/core';
import {
  getSupportedInputTypes,
  Platform,
  supportsPassiveEventListeners,
  supportsScrollBehavior,
} from '@angular/cdk/platform';


@Component({
  selector: 'app-app-look',
  templateUrl: './app-look.component.html',
  styleUrls: ['./app-look.component.css']
})
export class AppLookComponent implements OnInit {
  
  constructor(public platform: Platform) {
    console.log(this.platform);
  }

  ngOnInit() {
  }

}
