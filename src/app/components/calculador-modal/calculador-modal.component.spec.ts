import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadorModalComponent } from './calculador-modal.component';

describe('CalculadorModalComponent', () => {
  let component: CalculadorModalComponent;
  let fixture: ComponentFixture<CalculadorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculadorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculadorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
