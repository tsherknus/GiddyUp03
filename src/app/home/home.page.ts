import { Component } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {auth} from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 constructor( private fireauth: AngularFireAuth, private afDatabase: AngularFireDatabase, public navCtrl: Router, toast: ToastController) {}
 ionViewLoad() {
     this.fireauth.authState.subscribe(auth => { if (auth && data.email && auth.uid){
         this.toast.create({});
     } }
 }
}
