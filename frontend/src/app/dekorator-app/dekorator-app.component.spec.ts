import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DekoratorAppComponent } from './dekorator-app.component';

describe('DekoratorAppComponent', () => {
  let component: DekoratorAppComponent;
  let fixture: ComponentFixture<DekoratorAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DekoratorAppComponent]
    });
    fixture = TestBed.createComponent(DekoratorAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
