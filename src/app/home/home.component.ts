import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

// the following two lines required for firebase real time database
import { environment } from '../../environments/environment'
firebase.initializeApp(environment.firebase)

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  
  user_name : String

  constructor() {
    
    // a simple query to fire base real time data base
    firebase.database().ref('/users/1/user_name').once('value').then(snapshot => {
      this.user_name = snapshot.val()
      console.log(this.user_name)
    })
  }

  ngOnInit() {
  }

}
