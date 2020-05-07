import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarConsultaComponent } from './mostrar-consulta.component';

describe('MostrarConsultaComponent', () => {
  let component: MostrarConsultaComponent;
  let fixture: ComponentFixture<MostrarConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
