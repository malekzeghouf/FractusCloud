import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetfrontComponent } from './projetfront.component';

describe('ProjetfrontComponent', () => {
  let component: ProjetfrontComponent;
  let fixture: ComponentFixture<ProjetfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetfrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
