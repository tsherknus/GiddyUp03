import { Component, OnInit } from '@angular/core';
import {Profile} from './profile';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
profile = {} as Profile;
  constructor(private fireauth: AngularFireAuth, private afDatabase: AngularFireDatabase, public navCtrl: Router) { }

  ngOnInit() {
  }
  createProfile() {
    this.fireauth.authState.subscribe(auth => {
      this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
          .then(() => this.navCtrl.navigateByUrl('home'));
    });
  }

}
