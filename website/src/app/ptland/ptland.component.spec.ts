import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtlandComponent } from './ptland.component';

describe('PtlandComponent', () => {
  let component: PtlandComponent;
  let fixture: ComponentFixture<PtlandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtlandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtlandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
