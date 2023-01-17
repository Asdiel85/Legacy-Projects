import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingGuard } from "./shared/guards/routing.guard";

const routes: Routes = [
  {path: '', redirectTo: '/popular', pathMatch: 'full'},
  {
    path: 'popular',
    loadChildren: () => import('./movie/movie.module').then(m => m.MovieModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./authentication/authentication.module')
      .then(m => m.AuthenticationModule),
    canActivate: [RoutingGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import ('./user/registration.module')
  .then(m => m.RegistrationModule),
    canActivate: [RoutingGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutesModule {
}
