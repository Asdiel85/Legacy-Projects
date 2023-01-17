import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration-component/registration.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path: ``, component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule {
}
