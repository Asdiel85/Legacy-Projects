/*MODULES*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
/*COMPONENTS*/
import { MovieComponent } from './components/movie-component/movie.component';
import { MoviePictureComponent } from './components/movie-picture/movie-picture.component';
import { MoviesPageComponent } from './components/movies-page/movies-page.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { FullCastComponent } from './components/full-cast/full-cast.component';
import { AllReviewsComponent } from './components/all-reviews/all-reviews.component';
import { TimePipe } from '../shared/pipes/time.pipe';
import { GenrePipePipe } from '../shared/pipes/genre-pipe.pipe';
import { ShowMoreButtonComponent } from './components/show-more-button-component/show-more-button-component';
import { CustomRouteReuseStrategy } from '../router-strategy';
import { MoviesRoutingModule } from './movie-routing.module';

@NgModule({
  declarations: [
    MovieComponent,
    MoviePictureComponent,
    MoviesPageComponent,
    MovieDetailsComponent,
    FullCastComponent,
    AllReviewsComponent,
    TimePipe,
    GenrePipePipe,
    ShowMoreButtonComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
  ],
  exports: [
    MovieComponent,
    MoviePictureComponent,
    MoviesPageComponent,
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy
    }
  ]
})
export class MovieModule {
}
