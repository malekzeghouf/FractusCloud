import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Projetfront1Component } from './projetfront1.component';

describe('Projetfront1Component', () => {
  let component: Projetfront1Component;
  let fixture: ComponentFixture<Projetfront1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Projetfront1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Projetfront1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
