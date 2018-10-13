import { Component, OnInit } from '@angular/core';
import * as firebaseui from 'firebaseui';
import {FirebaseService} from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  ui: firebaseui.auth.AuthUI;
  firebase_service: FirebaseService;
  user_name: String;
  user_email: String;

  ngOnInit() {
    console.log('init started');
    // if (this.user_name === null) {
    //   this.ui.start('#firebaseui-auth-container', this.firebase_service.get_config());
    // }
    console.log('init finished');
  }

  ngAfterViewInit() {
    console.log('view_init')
    if (this.user_name === null) {
      this.ui.start('#firebaseui-auth-container', this.firebase_service.get_config());
    }
  }

  // start_ui(): void {
  //  this.ui.start('#firebaseui-auth-container', this.firebase_service.get_config());
  // }

  constructor(firebase_service: FirebaseService) {
    console.log('constructor started');
    this.firebase_service = firebase_service;
    this.ui = firebase_service.get_login_ui();
    this.user_name = sessionStorage.getItem('user_name');
    this.user_email = sessionStorage.getItem('user_email');
    console.log('constructor finished');
  }

  // login(): void {
  //  this.ui.start('#firebaseui-auth-container', this.firebase_service.get_config());
  // }

  logout(): void {
    sessionStorage.clear();
    this.user_name = undefined;
    this.user_email = undefined;
  }
}
