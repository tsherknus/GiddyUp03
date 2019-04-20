import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {User} from '../../user';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    user = {} as User;

    constructor(public fireauth: AngularFireAuth, public navCtrl: Router) { }

    ngOnInit() {
    }

    async signin(user: User) {
      try {
       const result =  this.fireauth.auth.signInWithEmailAndPassword(user.email, user.password);
       if (result) {
           console.log(result);
           this.navCtrl.navigateByUrl('home');
       }
      } catch (e) {
          console.log(e);
      }
    }

    async register(user: User) {
        try {
            const result = await  this.fireauth.auth.createUserWithEmailAndPassword(user.email, user.password );
            if (result) {
                console.log(result);
            }
        } catch (e) {
            console.error(e);
        }
    }
}
