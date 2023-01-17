import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from './authentication/guards/user-guard';


const routes: Routes = [
  {path: '', redirectTo: 'volumes', pathMatch: 'full'},
  {
    path: 'volumes',
    loadChildren: () => import('./volume/volumes.module').then(m => m.VolumesModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./authentication/authentication.module')
      .then(m => m.AuthenticationModule),
    canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
