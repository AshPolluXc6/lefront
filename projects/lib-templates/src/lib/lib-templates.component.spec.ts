import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibTemplatesComponent } from './lib-templates.component';

describe('LibTemplatesComponent', () => {
  let component: LibTemplatesComponent;
  let fixture: ComponentFixture<LibTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibTemplatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
