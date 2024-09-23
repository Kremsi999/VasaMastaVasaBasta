import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoratorSchedulingComponent } from './decorator-scheduling.component';

describe('DecoratorSchedulingComponent', () => {
  let component: DecoratorSchedulingComponent;
  let fixture: ComponentFixture<DecoratorSchedulingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecoratorSchedulingComponent]
    });
    fixture = TestBed.createComponent(DecoratorSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
