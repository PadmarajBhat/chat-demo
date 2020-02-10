import {AfterViewInit, Component, Directive, Input, QueryList, ViewChildren} from '@angular/core';

@Directive({selector: 'pane'})
export class Pane {
  @Input() id !: string;
}

@Component({
  selector: 'example-app',
  
  template: `
    <pane id="1"><input value="abcd" text></pane>
    <pane id="2"></pane>
    <pane id="3" *ngIf="shouldShow"></pane>

    <button (click)="show()">Show 3</button>

    <div>panes: {{serializedPanes}}</div>
  `,
})
export class ViewChildrenComp implements AfterViewInit {
  @ViewChildren(Pane) panes !: QueryList<Pane>;
  serializedPanes: string = '';

  shouldShow = false;

  show() { this.shouldShow = !this.shouldShow; }

  ngAfterViewInit() {
    this.calculateSerializedPanes();
    this.panes.changes.subscribe((r) => { this.calculateSerializedPanes(); console.log("called");});
  }

  calculateSerializedPanes() {
    setTimeout(() => { this.serializedPanes = this.panes.map(p => p.id).join(', '); }, 0);
  }
}
