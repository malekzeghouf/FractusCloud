import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherRendezVousComponent } from './afficher-rendez-vous.component';

describe('AfficherRendezVousComponent', () => {
  let component: AfficherRendezVousComponent;
  let fixture: ComponentFixture<AfficherRendezVousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherRendezVousComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
