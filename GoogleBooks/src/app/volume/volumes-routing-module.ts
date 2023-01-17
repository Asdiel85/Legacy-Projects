import { SearchVolumesComponent } from './components/search-volumes/search-volumes.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { VolumeDetailsComponent } from './components/volume-details/volume-details.component';
import { MyVolumesComponent } from './components/my-volumes/my-volumes.component';
import { AuthenticationGuard } from '../authentication/guards/authentication-guard';
import { CreateMyVolumeComponent } from './components/create-my-volume/create-my-volume.component';

const routes: Routes = [
  {path: '', component: SearchVolumesComponent},
  {path: 'results', component: SearchResultsComponent},
  {path: 'volumes/:id', component: VolumeDetailsComponent},
  {
    path: 'favorites', component: MyVolumesComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'favorites/create-volume', component: CreateMyVolumeComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'edit/:id', component: CreateMyVolumeComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VolumesRoutingModule {
}
