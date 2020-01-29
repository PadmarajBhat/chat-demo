import { Component, OnInit } from '@angular/core';
import { SavemsgService } from '../savemsg.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor() { ser: SavemsgService}

  ngOnInit() {
  }

}
