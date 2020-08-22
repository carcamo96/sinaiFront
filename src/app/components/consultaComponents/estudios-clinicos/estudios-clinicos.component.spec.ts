import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiosClinicosComponent } from './estudios-clinicos.component';

describe('EstudiosClinicosComponent', () => {
  let component: EstudiosClinicosComponent;
  let fixture: ComponentFixture<EstudiosClinicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudiosClinicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiosClinicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
