import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyModalPage } from './my-modal';

@NgModule({
  declarations: [
    MyModalPage,
  ],
  imports: [
    IonicPageModule.forChild(MyModalPage),
  ],
})
export class MyModalPageModule {}
