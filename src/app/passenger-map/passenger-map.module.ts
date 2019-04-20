import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PassengerMapPage } from './passenger-map.page';
import {AgmCoreModule} from "@agm/core";
import {AgmDirectionModule} from "agm-direction";
import {HttpClientModule} from "@angular/common/http";

const routes: Routes = [
  {
    path: '',
    component: PassengerMapPage
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
  declarations: [PassengerMapPage]
})
export class PassengerMapPageModule {}
