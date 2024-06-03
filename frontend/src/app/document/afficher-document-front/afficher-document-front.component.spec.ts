import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherDocumentFrontComponent } from './afficher-document-front.component';

describe('AfficherDocumentFrontComponent', () => {
  let component: AfficherDocumentFrontComponent;
  let fixture: ComponentFixture<AfficherDocumentFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherDocumentFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherDocumentFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
