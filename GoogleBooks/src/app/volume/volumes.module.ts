import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolumeComponent } from './components/volume-component/volume.component';
import { SearchVolumesComponent } from './components/search-volumes/search-volumes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VolumesRoutingModule } from './volumes-routing-module';
import { ArraySplitPipe } from '../shared/pipes/array-split.pipe';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { RouteReuseStrategy } from '@angular/router';
import { VolumeDetailsComponent } from './components/volume-details/volume-details.component';
import { SharedModule } from '../shared/shared.module';
import { MyVolumesComponent } from './components/my-volumes/my-volumes.component';
import { CreateMyVolumeComponent } from './components/create-my-volume/create-my-volume.component';
import { CustomRouteReuseStrategy } from '../route-strategy';

@NgModule({
  declarations: [
    VolumeComponent,
    SearchVolumesComponent,
    ArraySplitPipe,
    SearchResultsComponent,
    VolumeDetailsComponent,
    MyVolumesComponent,
    CreateMyVolumeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VolumesRoutingModule,
    SharedModule
  ],
  exports: [
    SearchVolumesComponent
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy
    }
  ]
})
export class VolumesModule {
}
