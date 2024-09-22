import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerAppComponent } from './owner-app.component';

describe('OwnerAppComponent', () => {
  let component: OwnerAppComponent;
  let fixture: ComponentFixture<OwnerAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerAppComponent]
    });
    fixture = TestBed.createComponent(OwnerAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
