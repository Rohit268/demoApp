import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

/*
  Generated class for the HomeProvider provider.

  See https://angular.io/  saveUser(arg0: any): any {
    throw new Error("Method not implemented.");
  }
guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomeProvider {

  constructor(public http: Http) {
    console.log('Hello HomeProvider Provider');
  }

  getData(){
    return new Promise((resolve) => {
      this.http.get("http://localhost/laravel/public/index.php/student/")
        .map(res => res.json())
        .subscribe(
        data => { resolve(data) },
        )
    });
  }

  saveUser(data){
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost/laravel/public/index.php/student/insert',data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  delete(id){
    return new Promise((resolve,reject) => {
      this.http.get("http://localhost/laravel/public/index.php/student/delete/" +id)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  login(data){
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost/laravel/public/index.php/student/login',data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getUserData(id){
    return new Promise((resolve) => {
      this.http.get("http://localhost/laravel/public/index.php/student/edit/" +id)
        .map(res => res.json())
        .subscribe(
        data => { resolve(data) },
        )
    });
  }

  updateUser(id, data){
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost/laravel/public/index.php/student/update/' +id, data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
