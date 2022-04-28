import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExamFormComponent } from './new-exam-form.component';

describe('NewExamFormComponent', () => {
  let component: NewExamFormComponent;
  let fixture: ComponentFixture<NewExamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewExamFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
