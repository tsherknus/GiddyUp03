/// <reference types="@types/googlemaps" />
import * as tslib_1 from "tslib";
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
var DriverMapPage = /** @class */ (function () {
    function DriverMapPage(geolocation, mapsAPILoader, ngZone, http) {
        this.geolocation = geolocation;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.http = http;
        this.markersOff = true;
    }
    DriverMapPage.prototype.ngOnInit = function () {
        var _this = this;
        //create search FormControl
        this.searchControl = new FormControl();
        //load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            _this.autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: []
            });
            _this.autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    //get the place result
                    var place = _this.autocomplete.getPlace();
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    //set latitude, longitude and zoom
                    _this.latitude = place.geometry.location.lat();
                    _this.longitude = place.geometry.location.lng();
                    _this.zoom = 14;
                    _this.getDirection();
                });
            });
            _this.getLocation();
        });
        var theLoop = function (i) {
            setTimeout(function () {
                _this.getLocation();
                if (--i) {
                    theLoop(i);
                }
            }, 1000);
        };
        theLoop(9000);
    };
    DriverMapPage.prototype.getLocation = function () {
        var _this = this;
        var options = {
            timeout: 10000,
            enableHighAccuracy: true
        };
        this.geolocation.getCurrentPosition(options).then(function (resp) {
            _this.lat = resp.coords.latitude;
            console.log(resp.coords.latitude);
            _this.lng = resp.coords.longitude;
            console.log(resp.coords.longitude);
            _this.zoom = 16;
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    DriverMapPage.prototype.getDirections = function (oLat, oLng, dLat, dLng) {
        return this.http.get("https://maps.googleapis.com/maps/api/directions/json?origin=" + oLat + "," + oLng + "&destination=" + dLat + "," + dLng + "&key=AIzaSyBpb9FeAHl54o7wl9N6emBbgbdUaPX_yzk");
    };
    // "https://maps.googleapis.com/maps/api/directions/json?origin=" + this.lat + "," + this.lng + "&destination=" + this.latitude + "," + this.latitude + "key=AIzaSyBHmC7WbuSh95dO3BzYMuA5ULvea1AgQB8"
    DriverMapPage.prototype.distance = function (lat1, lon1, lat2, lon2) {
        var p = 0.017453292519943295; // Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p) / 2 +
            c(lat1 * p) * c(lat2 * p) *
                (1 - c((lon2 - lon1) * p)) / 2;
        return 7917 * Math.asin(Math.sqrt(a)); // 2 * R; R = 3958.7 km
    };
    DriverMapPage.prototype.getDirection = function () {
        var _this = this;
        this.markersOff = false;
        this.origin = { lat: this.lat, lng: this.lng };
        this.destination = { lat: this.latitude, lng: this.longitude };
        console.log(this.distance(this.origin.lat, this.origin.lng, this.destination.lat, this.destination.lng));
        this.getDirections(this.lat, this.lng, this.latitude, this.longitude).subscribe(function (directions) {
            _this.directions = directions;
            _this.totalDistance = directions.routes[0].legs[0].distance;
            _this.rideDuration = directions.routes[0].legs[0].duration;
            _this.directions = directions.routes[0].legs[0].steps;
        });
    };
    tslib_1.__decorate([
        ViewChild('map'),
        tslib_1.__metadata("design:type", ElementRef)
    ], DriverMapPage.prototype, "elementView", void 0);
    tslib_1.__decorate([
        ViewChild("search"),
        tslib_1.__metadata("design:type", ElementRef)
    ], DriverMapPage.prototype, "searchElementRef", void 0);
    DriverMapPage = tslib_1.__decorate([
        Component({
            selector: 'app-driver-map',
            templateUrl: './driver-map.page.html',
            styleUrls: ['./driver-map.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Geolocation,
            MapsAPILoader,
            NgZone,
            HttpClient])
    ], DriverMapPage);
    return DriverMapPage;
}());
export { DriverMapPage };
//# sourceMappingURL=driver-map.page.js.map