import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongPressComponent } from './long-press.component';

describe('LongPressComponent', () => {
  let component: LongPressComponent;
  let fixture: ComponentFixture<LongPressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LongPressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongPressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
