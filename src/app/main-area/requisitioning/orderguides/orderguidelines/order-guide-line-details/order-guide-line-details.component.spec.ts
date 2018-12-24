import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderGuideLineDetailsComponent } from './order-guide-line-details.component';

describe('OrderGuideLineDetailsComponent', () => {
  let component: OrderGuideLineDetailsComponent;
  let fixture: ComponentFixture<OrderGuideLineDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderGuideLineDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderGuideLineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
