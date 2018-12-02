import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  firebase_service: FirebaseService;
  user_name: String;
  user_email: String;

  ngOnInit() { }

  ngAfterViewInit() {
    this.start_ui();
  }

  start_ui(): void {
    if (this.user_name === null) {
      this.firebase_service.get_login_ui().start(
        '#firebaseui-auth-container',
        this.firebase_service.get_config()
      );
    }
  }

  constructor(firebase_service: FirebaseService) {
    this.firebase_service = firebase_service;
    this.user_name = sessionStorage.getItem('user_name');
    this.user_email = sessionStorage.getItem('user_email');
  }

  logout(): void {
    sessionStorage.clear();
    this.user_name = undefined;
    this.user_email = undefined;
  }
}
