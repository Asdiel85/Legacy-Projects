import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullCastComponent } from './components/full-cast/full-cast.component';
import { MoviesPageComponent } from './components/movies-page/movies-page.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { AllReviewsComponent } from './components/all-reviews/all-reviews.component';

const routes: Routes = [
  {path: '' , component: MoviesPageComponent},
  {path: 'movie/:id', component: MovieDetailsComponent},
  {path: 'movie/:id/credits', component: FullCastComponent},
  {path: 'movie/:id/reviews', component: AllReviewsComponent}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MoviesRoutingModule {
}
