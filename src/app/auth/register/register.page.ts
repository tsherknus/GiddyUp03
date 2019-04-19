import { Component, OnInit } from '@angular/core';
import {User} from '../../user';
import {NavController, NavParams} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
user = {} as User;
  constructor( public fireauth: AngularFireAuth ,  public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
  }
 async register(user: User) {
    try {
        const result = await  this.fireauth.auth.createUserWithEmailAndPassword(user.email, user.password );
        console.log(result);
    } catch (e) {
        console.error(e);
    }
 }
}
