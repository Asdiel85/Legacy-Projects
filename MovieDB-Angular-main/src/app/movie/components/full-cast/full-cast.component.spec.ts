import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullCastComponent } from './full-cast.component';

describe('FullCastComponent', () => {
  let component: FullCastComponent;
  let fixture: ComponentFixture<FullCastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullCastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullCastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
