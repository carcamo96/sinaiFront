import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRecetaComponent } from './modal-receta.component';

describe('ModalRecetaComponent', () => {
  let component: ModalRecetaComponent;
  let fixture: ComponentFixture<ModalRecetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRecetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
