import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLimpiezaComponent } from './form-limpieza.component';

describe('FormLimpiezaComponent', () => {
  let component: FormLimpiezaComponent;
  let fixture: ComponentFixture<FormLimpiezaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLimpiezaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLimpiezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
