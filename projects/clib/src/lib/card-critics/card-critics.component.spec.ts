import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCriticsComponent } from './card-critics.component';

describe('CardCriticsComponent', () => {
  let component: CardCriticsComponent;
  let fixture: ComponentFixture<CardCriticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCriticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardCriticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
