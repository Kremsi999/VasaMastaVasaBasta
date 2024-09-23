import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerFirmsPageComponent } from './owner-firms-page.component';

describe('OwnerFirmsPageComponent', () => {
  let component: OwnerFirmsPageComponent;
  let fixture: ComponentFixture<OwnerFirmsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerFirmsPageComponent]
    });
    fixture = TestBed.createComponent(OwnerFirmsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
