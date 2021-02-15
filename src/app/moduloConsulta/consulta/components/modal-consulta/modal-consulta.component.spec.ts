import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConsultaComponent } from './modal-consulta.component';

describe('ModalConsultaComponent', () => {
  let component: ModalConsultaComponent;
  let fixture: ComponentFixture<ModalConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
