import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherSalleComponent } from './afficher-salle.component';

describe('AfficherSalleComponent', () => {
  let component: AfficherSalleComponent;
  let fixture: ComponentFixture<AfficherSalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherSalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
