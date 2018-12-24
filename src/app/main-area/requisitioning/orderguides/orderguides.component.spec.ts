import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderguidesComponent } from './orderguides.component';

describe('OrderguidesComponent', () => {
  let component: OrderguidesComponent;
  let fixture: ComponentFixture<OrderguidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderguidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderguidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
