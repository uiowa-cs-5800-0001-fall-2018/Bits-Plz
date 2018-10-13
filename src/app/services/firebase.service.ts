import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {environment} from '../../environments/environment';
import * as firebaseui from 'firebaseui';
import AuthUI = firebaseui.auth.AuthUI;
firebase.initializeApp(environment.firebase);

@Injectable()
export class FirebaseService {

  ui: AuthUI;

  constructor() { }

  get_config() {
    return {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirct_url) {
          sessionStorage.setItem('user_name', authResult.user.displayName);
          sessionStorage.setItem('user_email', authResult.user.email);
          return true;
        }
      },
      signInSuccessUrl: '/home',
      signInFlow: 'popup',
      queryParameterForWidgetMode: 'select',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
    };
  }

  get_login_ui() {
    if (this.ui === undefined) {
      this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    return this.ui;
  }
}
