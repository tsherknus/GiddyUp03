import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
var ProfilePage = /** @class */ (function () {
    function ProfilePage(fireauth, afDatabase, navCtrl) {
        this.fireauth = fireauth;
        this.afDatabase = afDatabase;
        this.navCtrl = navCtrl;
        this.profile = {};
    }
    ProfilePage.prototype.ngOnInit = function () {
    };
    ProfilePage.prototype.createProfile = function () {
        var _this = this;
        this.fireauth.authState.subscribe(function (auth) {
            _this.afDatabase.object("profile/" + auth.uid).set(_this.profile)
                .then(function () { return _this.navCtrl.navigateByUrl('home'); });
        });
    };
    ProfilePage = tslib_1.__decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.page.html',
            styleUrls: ['./profile.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth, AngularFireDatabase, Router])
    ], ProfilePage);
    return ProfilePage;
}());
export { ProfilePage };
//# sourceMappingURL=profile.page.js.map