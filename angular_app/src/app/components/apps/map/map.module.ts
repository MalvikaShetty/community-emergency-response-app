import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { MapRoutingModule } from './map-routing.module'; // Import the MapRoutingModule
import { MapComponent } from './map/map.component'; // Import the MapComponent

@NgModule({
  declarations: [MapComponent], // Declare the MapComponent
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MapRoutingModule, // Add MapRoutingModule to imports
    SharedModule
  ]
})
export class MapModule { }
