import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapComponent } from './map/map.component'; // Assuming your map component is named MapComponent

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      component: MapComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MapRoutingModule { }
