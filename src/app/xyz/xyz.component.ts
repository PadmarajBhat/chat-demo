import { Component, OnInit } from '@angular/core';
import { SavemsgService } from '../savemsg.service';

@Component({
  selector: 'app-xyz',
  templateUrl: './xyz.component.html', 
  styleUrls: ['./xyz.component.css']
})
export class XyzComponent implements OnInit {
 
  constructor(private saveMsg: SavemsgService) {
  }

  ngOnInit() {
    this.saveMsg.getMessages();
  }

  addMessage(msg: string) {
    if (msg.length > 0) {
      this.saveMsg.addMessage(msg);
    }
  }

}
