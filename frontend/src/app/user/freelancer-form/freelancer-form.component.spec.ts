import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerFormComponent } from './freelancer-form.component';

describe('FreelancerFormComponent', () => {
  let component: FreelancerFormComponent;
  let fixture: ComponentFixture<FreelancerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelancerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
