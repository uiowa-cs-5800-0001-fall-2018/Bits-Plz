import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BlocklyComponent } from './blockly/blockly.component';
import { FirebaseService } from './services/firebase.service';
import { TwitterService } from './services/twitter.service';

import { FlashMessagesModule } from 'ngx-flash-messages';
import { ResultDisplayComponent } from './result-display/result-display.component';
import {BlocksService} from './blocks.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    HomeComponent,
    BlocklyComponent,
    ResultDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FlashMessagesModule
  ],
  providers: [
    FirebaseService,
    TwitterService,
    BlocksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
