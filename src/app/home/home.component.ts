import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

// the following two lines required for firebase real time database
// import { environment } from '../../environments/environment';
// firebase.initializeApp(environment.firebase);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  query_res: String;
  user_name: String;
  user_email: String;

  constructor() {
    this.user_name = sessionStorage.getItem('user_name');
    this.user_email = sessionStorage.getItem('user_email');
    if (this.user_name == null) {
      this.user_name = 'Anonymous Rainbow Cat';
    }
    if (this.user_email == null) {
      this.user_email = 'rainbow@cat.com';
    }

    // a simple query to fire base real time data base
    firebase.database().ref('/users/1/user_name').once('value').then(snapshot => {
      this.query_res = snapshot.val();
    });
  }

  ngOnInit() {
  }

}
