import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolunteersComponent } from './volunteers/volunteers.component';
import { AddVolunteersComponent } from './add-volunteers/add-volunteers.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      component: VolunteersComponent
    },
    {
      path: 'addvolunteer',
      component: AddVolunteersComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VolunteersRoutingModule { }
