import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarPacientesDeparComponent } from './bar-pacientes-depar.component';

describe('BarPacientesDeparComponent', () => {
  let component: BarPacientesDeparComponent;
  let fixture: ComponentFixture<BarPacientesDeparComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarPacientesDeparComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarPacientesDeparComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
