import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMyVolumeComponent } from './create-my-volume.component';

describe('CreateMyVolumeComponent', () => {
  let component: CreateMyVolumeComponent;
  let fixture: ComponentFixture<CreateMyVolumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMyVolumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMyVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
