import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetcoursComponent } from './getcours.component';

describe('GetcoursComponent', () => {
  let component: GetcoursComponent;
  let fixture: ComponentFixture<GetcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetcoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
