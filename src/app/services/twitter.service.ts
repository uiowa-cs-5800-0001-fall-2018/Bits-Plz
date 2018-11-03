import { Injectable } from '@angular/core';
import * as request from 'request-promise-native';
import { InputEntryModel } from './inputEntry.model';


@Injectable()
export class TwitterService {

  constructor() {
    const post_str = 'https://bits-plz-backend.herokuapp.com/search';

    console.log('request starting');
    request.post(post_str, (error, response, body) => { // 'response' is the actual content
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body); // Print the HTML of the response
      console.log('body type', typeof body);
    }).then(() => {
      console.log('request finished');
    });
  }

  parse_response(raw: string): InputEntryModel[] {
    return null;
  }

}
