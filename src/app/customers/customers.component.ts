import { Component, OnInit } from '@angular/core';
import { SavemsgService } from '../savemsg.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  myHeight = window.innerHeight - 300;
  //constructor() { this.myHeight = getHieght();}

  public getHieght() {
    console.log("height :", window.innerHeight);
    return window.innerHeight;
  }
  constructor() {
    ser: SavemsgService;
    console.log("customers loading");
  }

  ngOnInit() {
  }

}
