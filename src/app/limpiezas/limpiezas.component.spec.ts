import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimpiezasComponent } from './limpiezas.component';

describe('LimpiezasComponent', () => {
  let component: LimpiezasComponent;
  let fixture: ComponentFixture<LimpiezasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimpiezasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimpiezasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
