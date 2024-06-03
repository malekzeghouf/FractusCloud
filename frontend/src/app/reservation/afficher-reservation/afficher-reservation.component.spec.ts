import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherReservationComponent } from './afficher-reservation.component';

describe('AfficherReservationComponent', () => {
  let component: AfficherReservationComponent;
  let fixture: ComponentFixture<AfficherReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
