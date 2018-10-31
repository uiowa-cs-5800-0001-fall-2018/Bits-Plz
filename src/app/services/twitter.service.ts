import { Injectable } from '@angular/core';
import * as request from 'request-promise-native';


@Injectable()
export class TwitterService {

  constructor() {
    const post_str = 'node server deployed at https://bits-plz-backend.herokuapp.com/search';

    console.log('request starting');
    request.post(post_str, (error, response, body) => {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML of the response
    }).then(() => {
      console.log('request finished');
    });
  }
}
