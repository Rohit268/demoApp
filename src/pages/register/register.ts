import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeProvider } from '../../providers/home/home';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  private registerForm : FormGroup;
  //userInfo = { firstname:'',lastname:'',email: '', password: '' };
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public HomeProvider:HomeProvider,
              private formBuilder: FormBuilder) {
                this.registerForm = this.formBuilder.group({
                  firstname: [null, [Validators.required,Validators.minLength(5),Validators.maxLength(10)]],
                  lastname: [null, [Validators.required,Validators.minLength(5),Validators.maxLength(10)]],
                  email: [null, [Validators.required, Validators.email]],
                  password: [null, [Validators.required,Validators.minLength(5),Validators.maxLength(10)]],
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  // create(){
  //   //alert(JSON.stringify(this.userInfo));
  //   this.HomeProvider.saveUser(this.registerForm.value).then((result) => {
  //     console.log(result);
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }
  
}