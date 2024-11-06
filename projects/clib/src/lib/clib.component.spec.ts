import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClibComponent } from './clib.component';

describe('ClibComponent', () => {
  let component: ClibComponent;
  let fixture: ComponentFixture<ClibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClibComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
