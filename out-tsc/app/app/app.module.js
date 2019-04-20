import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AgmCoreModule, GoogleMapsAPIWrapper } from "@agm/core";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgmDirectionModule } from "agm-direction";
import { NativeGeocoder } from "@ionic-native/native-geocoder";
import { Geolocation } from "@ionic-native/geolocation";
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [AppComponent],
            entryComponents: [],
            imports: [
                BrowserModule,
                IonicModule.forRoot(),
                AppRoutingModule,
                AngularFireModule.initializeApp(environment.firebase),
                AngularFireAuthModule,
                AngularFireDatabaseModule,
                ReactiveFormsModule,
                FormsModule,
                AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyDFTKbcSXEN22pUx3zfaabEOGyy7oOZtmI',
                    libraries: ["places", "geometry"]
                }),
                AgmDirectionModule,
                HttpClientModule,
                FlexLayoutModule
            ],
            providers: [
                StatusBar,
                SplashScreen,
                Geolocation,
                NativeGeocoder,
                HttpClient,
                GoogleMapsAPIWrapper,
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map