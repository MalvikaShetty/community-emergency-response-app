import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { SharedModule } from '../../../shared/shared.module';
import { VolunteersRoutingModule } from './volunteers-routing.module';
import {ProductStatusChartBoxComponent} from '../../dashboard/default/product-status-chart-box/product-status-chart-box.component';
import { DashboardModule } from '../../dashboard/dashboard.module';

import { VolunteersComponent } from './volunteers/volunteers.component';
import { AddVolunteersComponent } from './add-volunteers/add-volunteers.component';
// import { NgxDropzoneModule } from '../../../../../node_modules/ngx-dropzone/ngx-dropzone';
import { NgxDropzoneModule } from 'ngx-dropzone';
// import { DefaultFormComponent } from '../../forms/form-Layouts/default-form/default-form.component';

@NgModule({
  declarations: [
    VolunteersComponent,
    AddVolunteersComponent, 
    // DefaultFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VolunteersRoutingModule,
    PickerModule,
    EmojiModule,
    SharedModule,
    DashboardModule,
    NgxDropzoneModule
  ]
})
export class VolunteersModule { }
