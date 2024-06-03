import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterRendezVousFrontComponent } from './ajouter-rendez-vous-front.component';

describe('AjouterRendezVousFrontComponent', () => {
  let component: AjouterRendezVousFrontComponent;
  let fixture: ComponentFixture<AjouterRendezVousFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterRendezVousFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterRendezVousFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
