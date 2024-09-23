import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoratorStatsComponent } from './decorator-stats.component';

describe('DecoratorStatsComponent', () => {
  let component: DecoratorStatsComponent;
  let fixture: ComponentFixture<DecoratorStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecoratorStatsComponent]
    });
    fixture = TestBed.createComponent(DecoratorStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
