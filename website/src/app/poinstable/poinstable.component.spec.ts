import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoinstableComponent } from './poinstable.component';

describe('PoinstableComponent', () => {
  let component: PoinstableComponent;
  let fixture: ComponentFixture<PoinstableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoinstableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoinstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
