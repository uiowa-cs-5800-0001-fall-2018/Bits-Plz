import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { BlocklyComponent } from './blockly/blockly.component';
import { FirebaseService } from './services/firebase.service';
import { TwitterService } from './services/twitter.service';

import { FlashMessagesModule } from 'ngx-flash-messages';
import { ResultDisplayComponent } from './result-display/result-display.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
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
    TwitterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
