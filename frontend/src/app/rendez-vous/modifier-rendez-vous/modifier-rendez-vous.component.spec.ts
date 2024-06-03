import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierRendezVousComponent } from './modifier-rendez-vous.component';

describe('ModifierRendezVousComponent', () => {
  let component: ModifierRendezVousComponent;
  let fixture: ComponentFixture<ModifierRendezVousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierRendezVousComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
