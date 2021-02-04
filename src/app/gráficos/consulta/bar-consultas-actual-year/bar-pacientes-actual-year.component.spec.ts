import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarPacientesActualYearComponent } from './bar-pacientes-actual-year.component';

describe('BarPacientesActualYearComponent', () => {
  let component: BarPacientesActualYearComponent;
  let fixture: ComponentFixture<BarPacientesActualYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarPacientesActualYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarPacientesActualYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
