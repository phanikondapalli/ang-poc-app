import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitioningComponent } from './requisitioning.component';

describe('RequisitioningComponent', () => {
  let component: RequisitioningComponent;
  let fixture: ComponentFixture<RequisitioningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitioningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
