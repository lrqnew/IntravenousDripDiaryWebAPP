import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookDiaryComponent } from './look-diary.component';

describe('LookDiaryComponent', () => {
  let component: LookDiaryComponent;
  let fixture: ComponentFixture<LookDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookDiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
