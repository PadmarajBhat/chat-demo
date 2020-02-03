import { Component, OnInit, HostListener, Renderer, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-width-check',
  templateUrl: './width-check.component.html',
  styleUrls: ['./width-check.component.css']
})
export class WidthCheckComponent implements OnInit {
  @ViewChild('outerDiv', { static: false }) outerDiv: ElementRef;
  //@ViewChild('mydiv', { static: false }) myDiv: ElementRef;
  constructor(private renderer:Renderer) { }

  ngOnInit() {
  }

  getOuterHieght() {

    console.log("screen height", screen.height, "width", screen.width, "availH", screen.availHeight, "availW", screen.availWidth);
    console.log("window height", window.innerHeight, "width", window.innerWidth, "availH", window.outerHeight, "availW", window.outerWidth);
    return screen.availHeight * .5;
    //return window.innerHeight * .5;
  }

  getOuterWidth() {
    return screen.availWidth * .5;
    //return window.innerWidth * .5;
  }

  getOuterDivStyle() {
    return {
      //'width.px': this.getOuterWidth(),
      //'height.px': this.getOuterHieght(),/*this.getOuterHieght(),*/
      'width.%': 75,
      'height.%':75,
      'border': 'dashed',
      //'padding': '5%',
      //'--widthA': this.getOuterWidth(),
      'position': 'fixed',
      'top': '12.5%',
      'left': '12.5%',
      //'bottom': '75%',
      //'right':'75%',
      
      //'margin-left': -this.getOuterWidth()/2  + 'px',
      //'margin-top': -this.getOuterHieght()/2  + 'px'
      //'margin':'50% auto',
      //'box-sizing':'border-box',
      //'box-sizing': 'padding-box',
      //'box-sizing': 'content-box',

      //'overflow' :"auto",
      //'margin': '50% auto 50% auto',
      //'margin-top': '50%',
      //'margin-right': 'auto',
      //'margin-bottom': '50%',
      //'margin-left': 'auto',
      //'top': '50%',
      //'left': '50%',
      //'bottom': '50%',
      //'right' : '50%'
      //'position' : 'fixed',
    }
  }

  getInnerDivStyle() {
    return {
      'width.%': 100,
      'height.%': 100,
      'border': 'dashed',
      'padding': '5%',
      //'position': 'fixed',
      //'top': '50%',
      //'left': '50%',

      //'margin-left': -this.getOuterWidth() / 2 + 'px',
      //'margin-top': -this.getOuterHieght() / 2 + 'px'
      //'display': 'inline-block'
    }
  }

  @HostListener('window:orientationchange', ['$event']) onOrientationChange() {
    console.log("orientation changes in progress...");
    //this.renderer.setElementStyle(document.getElementById("outerDiv"), 'height', this.getOuterHieght().toString()+"px");
    //this.renderer.setElementStyle(this.outerDiv.nativeElement, 'height', '500px');
    //this.renderer.se
    this.outerDiv.nativeElement.setAttribute('height', this.getOuterHieght().toString() + "px");
    //let aa = document.createElement('div');
    //aa.setAttribute()
  }

}
