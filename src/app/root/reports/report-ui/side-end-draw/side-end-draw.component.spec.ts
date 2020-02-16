import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideEndDrawComponent } from './side-end-draw.component';

describe('SideEndDrawComponent', () => {
  let component: SideEndDrawComponent;
  let fixture: ComponentFixture<SideEndDrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideEndDrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideEndDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
