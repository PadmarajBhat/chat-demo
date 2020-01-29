import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerlevelfraudtrendComponent } from './careerlevelfraudtrend.component';

describe('CareerlevelfraudtrendComponent', () => {
  let component: CareerlevelfraudtrendComponent;
  let fixture: ComponentFixture<CareerlevelfraudtrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerlevelfraudtrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerlevelfraudtrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
