import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SavemsgService {
  chatMessages = [{ "user": "Hi" }, { "Bot": "Hello" }];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    console.log(" Service Constructor is being executed !!!");
  }

  async getMessages() {
    if (this.chatMessages.length == 0) {
      this.http.get("http://127.0.0.1:3000/items").subscribe(
        resp => this.chatMessages = resp[0]['msg'].split(","),
        () => { },
        () => { console.log("subscribe completed at savemsg !!!"); }
      ); 
    }
    

    /*let promObj = await this.http.get("http://127.0.0.1:3000/items").toPromise();
    this.chatMessages = promObj[0]['msg'].split(",");*/

    console.log("returning from savemsg service getmessages ", this.chatMessages);
  }

  addMessage(msg) {
    this.chatMessages.push({ "user": msg });
    this.http.post("http://127.0.0.1:3000/talkToAgent", { "user": msg }, this.httpOptions).subscribe(
      resp => {
        this.chatMessages.push({"Bot":resp.toString()});
        console.log("response from dialogflow : ", resp.toString());
        //this.chatMessages.push(resp);
      },
      () => { },
      () => { console.log("subscribe completed at savemsg !!!"); }
    )
    console.log("in savemsg service added : ", msg, this.chatMessages);
    return this.chatMessages;
  }
}
