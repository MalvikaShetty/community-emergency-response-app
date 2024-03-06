import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourcesRoutingModule } from './resources-routing.module';
import { CountToModule } from 'angular-count-to';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import 'hammerjs';
import 'mousetrap';
import { ResourcesComponent } from './resources.component';

@NgModule({
    
  declarations: [ResourcesComponent],
  imports: [
    CommonModule,
    ResourcesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CountToModule,
    GalleryModule,
  ]
})

export class ResourcesModule { }
