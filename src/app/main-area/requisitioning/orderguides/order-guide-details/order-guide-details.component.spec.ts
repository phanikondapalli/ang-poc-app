import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderGuideDetailsComponent } from './order-guide-details.component';

describe('OrderGuideDetailsComponent', () => {
  let component: OrderGuideDetailsComponent;
  let fixture: ComponentFixture<OrderGuideDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderGuideDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderGuideDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
