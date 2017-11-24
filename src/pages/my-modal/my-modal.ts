import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomeProvider } from '../../providers/home/home';
import { UserListPage } from '../user-list/user-list';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the MyModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-modal',
  templateUrl: 'my-modal.html',
})
export class MyModalPage {
  userdata: any={
    firstname: String,
    lastname : String,
    email : String,
    password : String
  };
  //imageData:any;
  imageURI:any;
  imageFileName:any;
  private regForm : FormGroup;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public HomeProvider:HomeProvider,
              private formBuilder: FormBuilder,
              private transfer: FileTransfer,
              private camera: Camera,) {
                this.regForm = this.formBuilder.group({
                  firstname: [null, [Validators.required,Validators.minLength(5),Validators.maxLength(10)]],
                  lastname: [null, [Validators.required,Validators.minLength(5),Validators.maxLength(10)]],
                  email: [null, [Validators.required, Validators.email]],
                  password: [null, [Validators.required,Validators.minLength(5),Validators.maxLength(50)]],
                  cnfrmPassword: ['', Validators.required],
                }, { validator: this.matchingPasswords('password', 'cnfrmPassword') });

                console.log('UserId', navParams.get('id'));
                var id = navParams.get('id');
                if(id){
                  this.HomeProvider.getUserData(id).then((resp: any) => {
                    this.userdata = resp;
                  })
                }else{
                  this.userdata = '';
                }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyModalPage');
  }

  modalhide() {
    this.viewCtrl.dismiss();
  }

  create(id){
    if(!id){
      this.HomeProvider.saveUser(this.regForm.value).then((result) => {
        console.log(result); 
        this.navCtrl.push(UserListPage);
      }, (err) => {
        console.log(err);
      });   
    }else{
      this.HomeProvider.updateUser(id,this.regForm.value).then((result) => {
        console.log(result);
        this.navCtrl.push(UserListPage);
      }, (err) => {
        console.log(err);
      });
    }
  }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
    });
  }

  uploadFile() {
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
    }, (err) => {
      console.log(err);
    });
  }

  matchingPasswords(passwordKey: string, cnfrmPasswordKey: string) {
		return (group: FormGroup): { [key: string]: any } => {
			let password = group.controls[passwordKey];
			let confirmPassword = group.controls[cnfrmPasswordKey];
			if (password.value !== confirmPassword.value) {
				return {
					mismatchedPasswords: true
				};
			} else {
				console.log("Password matches");
			}
		}
  }

  // upload(){
  //     const fileTransfer: FileTransferObject = this.transfer.create();

  //     let options1: FileUploadOptions = {
  //       fileKey: 'ionicfile',
  //       fileName: 'ionicfile',
  //       headers: {}
  //     }
      

  //     fileTransfer.upload(this.imageData, 'http://localhost/laravel/public/index.php/student/uploadImage', options1)
  //       .then((data) => {
  //         alert("success");
  //       }, (err) => {
  //         alert("error");
  //       });
  
  // }

}
