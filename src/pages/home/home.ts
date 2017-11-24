import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeProvider } from '../../providers/home/home';
import { RegisterPage } from '../../pages/register/register';
import { UserListPage } from '../../pages/user-list/user-list';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public userData: any;
  private loginForm : FormGroup;

    constructor(public navCtrl: NavController,
                public HomeProvider:HomeProvider,
                private formBuilder: FormBuilder) {
                  this.loginForm = this.formBuilder.group({
                    email: [null, [Validators.required, Validators.email]],
                    password: [null, [Validators.required,Validators.minLength(5),Validators.maxLength(10)]],
                  });
    }
    
  // private add() {
  //   this.navCtrl.push(RegisterPage);
  // }

  private list() {
    this.navCtrl.push(UserListPage);
  }

  // getData(){
  //   this.HomeProvider.getData().then((resp: { }) => {
  //     this.userData = resp;
  //     alert(JSON.stringify(this.userData));
  //   })
  // }

  login(){
    this.HomeProvider.login(this.loginForm.value).then((res) => {
      console.log(res);
      this.navCtrl.push(UserListPage);
    }, (err) => {
      console.log(err);
    });
    
  }
}
