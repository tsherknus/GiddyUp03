/// <reference types="@types/googlemaps" />

import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { } from 'googlemaps';
import {FormControl} from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { AgmMap } from '@agm/core';
import {LoadingController} from "@ionic/angular";
import {HTTP} from "@ionic-native/http/ngx";

@Component({
  selector: 'app-passenger-map',
  templateUrl: './passenger-map.page.html',
  styleUrls: ['./passenger-map.page.scss'],
})
export class PassengerMapPage implements OnInit {

  @ViewChild(AgmMap) public agmMap: AgmMap;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  public searchControl: FormControl;
  public latitude: number;
  public longitude: number;
  public zoom: number;
  public autocomplete: any;

  public markersOff: boolean = true;

  public origin: any;
  public destination: any;

  lat: number;
  lng: number;

  directions: any;
  totalDistance: any;
  rideCost: any = '';
  rideDuration: any;

  constructor(
      private geolocation: Geolocation,
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone,
      private http: HTTP,
      public loadingController: LoadingController) {
  }

  ngOnInit() {
    //create search FormControl
    this.agmMap.triggerResize();

    this.searchControl = new FormControl();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: []
      });
      this.autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 14;

          this.getDirection();
        });
      });
      this.getLocation();
    });

    let theLoop: (i: number) => void = (i: number) => {
      setTimeout(() => {
        this.getLocation();
        if (--i) {
          theLoop(i);
        }
      }, 500);
    };

    theLoop(9000);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Finding Driver ...',
      duration: 5000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  getLocation(){
    let options = {
      timeout:10000,
      enableHighAccuracy:true
    };

    this.geolocation.getCurrentPosition(options).then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.zoom = 16;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  // getDirections(oLat: any, oLng: any, dLat: any, dLng: any):Observable<any> {
  //      return this.http.get("https://maps.googleapis.com/maps/api/directions/json?origin=" + oLat + "," + oLng + "&destination=" + dLat + "," + dLng + "&key=AIzaSyBpb9FeAHl54o7wl9N6emBbgbdUaPX_yzk");
  // }

  getDirections(oLat: any, oLng: any, dLat: any, dLng: any):Promise<any> {
    // return this.http.get("https://maps.googleapis.com/maps/api/directions/json?origin=" + oLat + "," + oLng + "&destination=" + dLat + "," + dLng + "&key=AIzaSyBpb9FeAHl54o7wl9N6emBbgbdUaPX_yzk");
    return this.http.get('https://maps.googleapis.com/maps/api/directions/json?origin=' + oLat + ',' + oLng + '&destination=' + dLat + ',' + dLng + '&key=AIzaSyBpb9FeAHl54o7wl9N6emBbgbdUaPX_yzk', {}, {})
        .then(directions => {
          this.directions = directions.data;
          alert(JSON.parse(this.directions.routes[0].legs[0].distance));
          this.totalDistance = this.directions.data.routes[0].legs[0].distance;

          this.rideCost = (2 * (+this.totalDistance.text.replace(' mi', '').replace(',', '')));
          this.rideDuration = this.directions.data.routes[0].legs[0].duration;
          this.directions = this.directions.data.routes[0].legs[0].steps
        })
        .catch(error => {

          console.log(error.status);
          console.log(error.error); // error message as string
          alert(error.error);
          alert(error.status);
          console.log(error.headers);

        });
  }

  distance(lat1, lon1, lat2, lon2) {
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat2 - lat1) * p)/2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p))/2;

    return 7917 * Math.asin(Math.sqrt(a)); // 2 * R; R = 3958.7 km
  }

  getDirection() {
    this.markersOff = false;
    this.origin = { lat: this.lat, lng: this.lng };
    this.destination = { lat: this.latitude, lng: this.longitude };

    console.log(this.distance(this.origin.lat, this.origin.lng, this.destination.lat, this.destination.lng));

    this.getDirections(this.lat, this.lng, this.latitude, this.longitude);
    //     .subscribe(
    //     directions => { this.directions = directions;
    //       this.totalDistance = directions.routes[0].legs[0].distance;
    //       console.log(+this.totalDistance.text.replace(' mi', '').replace(',', ''))
    //
    //       this.rideCost = (2 * (+this.totalDistance.text.replace(' mi', '').replace(',', '')));
    //       this.rideDuration = directions.routes[0].legs[0].duration;
    //       this.directions = directions.routes[0].legs[0].steps
    //     }
    // );
  }

  getRide() {
    this.presentLoading();
    console.log(this.origin, this.destination);
  }
}
