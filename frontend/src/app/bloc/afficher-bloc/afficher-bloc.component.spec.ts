import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherBlocComponent } from './afficher-bloc.component';

describe('AfficherBlocComponent', () => {
  let component: AfficherBlocComponent;
  let fixture: ComponentFixture<AfficherBlocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherBlocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
