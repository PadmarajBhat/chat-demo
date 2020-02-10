import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lmn',
  templateUrl: './lmn.component.html',
  styleUrls: ['./lmn.component.css']
})
export class LmnComponent implements OnInit {
  title = "Chat App";
  constructor() { console.log("lmn reloading !!!!"); }

  ngOnInit() {
  }

}
