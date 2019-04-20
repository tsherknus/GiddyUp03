import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverMapPage } from './driver-map.page';

describe('DriverMapPage', () => {
  let component: DriverMapPage;
  let fixture: ComponentFixture<DriverMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverMapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
