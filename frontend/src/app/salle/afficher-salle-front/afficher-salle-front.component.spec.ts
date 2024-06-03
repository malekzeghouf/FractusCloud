import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherSalleFrontComponent } from './afficher-salle-front.component';

describe('AfficherSalleFrontComponent', () => {
  let component: AfficherSalleFrontComponent;
  let fixture: ComponentFixture<AfficherSalleFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherSalleFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherSalleFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
