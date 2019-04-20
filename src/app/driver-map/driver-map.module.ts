import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AgmCoreModule, GoogleMapsAPIWrapper, MapsAPILoader} from "@agm/core";
import { DriverMapPage } from './driver-map.page';
import {HttpClientModule} from "@angular/common/http";
import {AgmDirectionModule} from "agm-direction";

const routes: Routes = [
  {
    path: '',
    component: DriverMapPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDFTKbcSXEN22pUx3zfaabEOGyy7oOZtmI',
      libraries: ["places", "geometry"]
    }),
    AgmDirectionModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DriverMapPage]
})
export class DriverMapPageModule {}
