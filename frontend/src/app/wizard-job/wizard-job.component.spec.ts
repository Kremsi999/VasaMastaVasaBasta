import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardJobComponent } from './wizard-job.component';

describe('WizardJobComponent', () => {
  let component: WizardJobComponent;
  let fixture: ComponentFixture<WizardJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardJobComponent]
    });
    fixture = TestBed.createComponent(WizardJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
