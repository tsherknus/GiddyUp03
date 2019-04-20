import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerMapPage } from './passenger-map.page';

describe('PassengerMapPage', () => {
  let component: PassengerMapPage;
  let fixture: ComponentFixture<PassengerMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerMapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
