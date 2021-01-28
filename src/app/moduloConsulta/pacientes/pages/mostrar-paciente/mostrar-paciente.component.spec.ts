import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPacienteComponent } from './mostrar-paciente.component';

describe('MostrarPacienteComponent', () => {
  let component: MostrarPacienteComponent;
  let fixture: ComponentFixture<MostrarPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
