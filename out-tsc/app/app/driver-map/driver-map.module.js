import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AgmCoreModule } from "@agm/core";
import { DriverMapPage } from './driver-map.page';
import { HttpClientModule } from "@angular/common/http";
import { AgmDirectionModule } from "agm-direction";
var routes = [
    {
        path: '',
        component: DriverMapPage
    }
];
var DriverMapPageModule = /** @class */ (function () {
    function DriverMapPageModule() {
    }
    DriverMapPageModule = tslib_1.__decorate([
        NgModule({
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
    ], DriverMapPageModule);
    return DriverMapPageModule;
}());
export { DriverMapPageModule };
//# sourceMappingURL=driver-map.module.js.map