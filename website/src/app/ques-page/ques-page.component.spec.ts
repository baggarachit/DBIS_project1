import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuesPageComponent } from './ques-page.component';

describe('QuesPageComponent', () => {
  let component: QuesPageComponent;
  let fixture: ComponentFixture<QuesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
