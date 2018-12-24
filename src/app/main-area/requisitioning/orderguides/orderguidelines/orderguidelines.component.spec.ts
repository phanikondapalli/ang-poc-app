import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderguidelinesComponent } from './orderguidelines.component';

describe('OrderguidelinesComponent', () => {
  let component: OrderguidelinesComponent;
  let fixture: ComponentFixture<OrderguidelinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderguidelinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderguidelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
