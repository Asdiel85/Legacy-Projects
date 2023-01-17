import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVolumesComponent } from './my-volumes.component';

describe('FavoriteVolumesComponent', () => {
  let component: MyVolumesComponent;
  let fixture: ComponentFixture<MyVolumesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVolumesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVolumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
