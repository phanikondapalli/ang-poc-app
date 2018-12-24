import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemcatalogComponent } from './itemcatalog.component';

describe('ItemcatalogComponent', () => {
  let component: ItemcatalogComponent;
  let fixture: ComponentFixture<ItemcatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemcatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemcatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
