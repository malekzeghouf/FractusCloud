import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterReservationFrontComponent } from './ajouter-reservation-front.component';

describe('AjouterReservationFrontComponent', () => {
  let component: AjouterReservationFrontComponent;
  let fixture: ComponentFixture<AjouterReservationFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterReservationFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterReservationFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
