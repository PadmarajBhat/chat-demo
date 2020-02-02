import { Component, OnInit, ElementRef, Renderer, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  @ViewChild('myDiv', { static: false }) myDiv: ElementRef;

  myHeight = window.innerHeight - 300;

  public getHieght() {
    console.log("height :", window.innerHeight, screen.availHeight);
    return screen.availHeight;
  }

  constructor( private renderer: Renderer) {
    console.log("customers loading", window.innerWidth,window.innerHeight );
  }

  ngOnInit() {
  }

  @HostListener('window:orientationchange', ['$event']) orientationchange() {
    this.renderer.setElementStyle(this.myDiv.nativeElement, 'height', screen.availHeight.toString() + "px"); 
  }
  

}
