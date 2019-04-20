import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 constructor( public navCtrl: Router) {}

    navProfile() {
     this.navCtrl.navigateByUrl('profile');
    }

    navDriverMaps() {
     this.navCtrl.navigateByUrl('driver-map')
    }

    navPassengerMaps() {
        this.navCtrl.navigateByUrl('passenger-map')
    }
}
