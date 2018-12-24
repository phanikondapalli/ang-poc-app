import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionlinesComponent } from './requisitionlines.component';

describe('RequisitionlinesComponent', () => {
  let component: RequisitionlinesComponent;
  let fixture: ComponentFixture<RequisitionlinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionlinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
