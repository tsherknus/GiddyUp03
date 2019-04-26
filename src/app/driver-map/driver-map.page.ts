/// <reference types="@types/googlemaps" />

import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { } from 'googlemaps';
import {FormControl} from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HTTP} from "@ionic-native/http/ngx";


@Component({
  selector: 'app-driver-map',
  templateUrl: './driver-map.page.html',
  styleUrls: ['./driver-map.page.scss'],
})
export class DriverMapPage implements OnInit {

  @ViewChild('map1') elementView1: ElementRef;

  @ViewChild("search1")
  public searchElementRef1: ElementRef;

  public searchControl1: FormControl;
  public latitude: number;
  public longitude: number;
  public zoom: number;
  public autocomplete: any;

  passengerLoc: any;

  public markersOff: boolean = true;

  plat: number;
  plng: number;

  public origin: any;
  public destination: any;

  lat: number;
  lng: number;

  directions: any;
  totalDistance: any;
  rideDuration: any;

  rideConfirmed: boolean = false;

  passengers: any;

  passenger1: Passenger = new class implements Passenger {
    dlat: number;
    dlng: number;
    lat: number;
    lng: number;
  };

  locPair: any[] = [];

  constructor(
      private geolocation: Geolocation,
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone,
      private http: HTTP) {
  }

  ngOnInit() {

    let theLoop: (i: number) => void = (i: number) => {
      setTimeout(() => {
        this.getLocation();
        if (--i) {
          theLoop(i);
        }
      }, 500);
    };

    theLoop(5);

    this.getPassengers();

  }

  inquireRide(rlat: number, rlng: number, dlat: number, dlng: number) {
    this.origin = { lat: this.lat, lng: this.lng };
    this.destination = { lat: dlat, lng: dlng };
    this.passengerLoc = { lat: rlat, lng: rlng};
    this.rideConfirmed = true;
  }

  goBack() {
    this.destination = undefined;
  }

  confirmRide() {
    this.rideConfirmed = true;
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

  // "https://maps.googleapis.com/maps/api/directions/json?origin=" + this.lat + "," + this.lng + "&destination=" + this.latitude + "," + this.latitude + "key=AIzaSyBHmC7WbuSh95dO3BzYMuA5ULvea1AgQB8"

  distance(lat1, lon1, lat2, lon2) {
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat2 - lat1) * p)/2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p))/2;

    return 7917 * Math.asin(Math.sqrt(a)); // 2 * R; R = 3958.7 km
  }

  //https://giddyup-23736.firebaseio.com/rest/passenger/location/ploc.json?print=pretty

  getPassengers():Promise<any> {
    // return this.http.get("https://maps.googleapis.com/maps/api/directions/json?origin=" + oLat + "," + oLng + "&destination=" + dLat + "," + dLng + "&key=AIzaSyBpb9FeAHl54o7wl9N6emBbgbdUaPX_yzk");
    return this.http.get("https://giddyup-23736.firebaseio.com/rest/shit/backend1/ploc.json?print=pretty", {}, {})
        .then(data => {
          this.passengers = JSON.parse(data.data);
          for (let pass of this.passengers.passenger) {
            this.passenger1 = pass;
            this.locPair.push(this.passenger1);
          }

          // this.directionsTest = JSON.stringify(this.directions);
          // this.totalDistance = JSON.stringify(this.directions.routes[0].legs[0].distance.text).replace('"', '').replace('"', '');
          // this.rideCost = JSON.stringify((2 * (+this.totalDistance.replace(' mi', '').replace(',', ''))));
          // this.rideDuration = this.directions.routes[0].legs[0].duration;
          // this.directions = this.directions.routes[0].legs[0].steps
        }).catch(error => {
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);
        });
  }
}
