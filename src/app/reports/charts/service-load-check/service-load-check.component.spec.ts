import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceLoadCheckComponent } from './service-load-check.component';

describe('ServiceLoadCheckComponent', () => {
  let component: ServiceLoadCheckComponent;
  let fixture: ComponentFixture<ServiceLoadCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceLoadCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceLoadCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
