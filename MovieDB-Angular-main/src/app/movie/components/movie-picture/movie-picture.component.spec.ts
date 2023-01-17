import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePictureComponent } from './movie-picture.component';

describe('MoviePictureComponent', () => {
  let component: MoviePictureComponent;
  let fixture: ComponentFixture<MoviePictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviePictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
