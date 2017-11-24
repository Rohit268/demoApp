import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeProvider } from '../../providers/home/home';
import { ModalController, AlertController } from 'ionic-angular';

import { MyModalPage } from '../../pages/my-modal/my-modal';

/**
 * Generated class for the UserListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html',
})
export class UserListPage {
  public userData: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public HomeProvider:HomeProvider,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController) {
      this.HomeProvider.getData().then((resp: any) => {
        this.userData = resp;
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserListPage');
  }

  modalshow(id) {
    if(id){
      let myModal = this.modalCtrl.create(MyModalPage,{id});
      myModal.present();
    }else{
      let myModal = this.modalCtrl.create(MyModalPage);
      myModal.present();
    }
  }

  delete(id){
    let alert = this.alertCtrl.create({
      title: 'Confirm Items',
      message: 'Do you want to remove this?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass:'icon-color',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          cssClass:'icon-color',
          handler: data => {
            this.HomeProvider.delete(id);
              console.log('Items Removed!');
              this.navCtrl.push(UserListPage);
          }
        }
      ]
    });
    alert.present();
  }

}
