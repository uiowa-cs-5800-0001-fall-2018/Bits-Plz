import { Injectable } from '@angular/core';
import * as request from 'request-promise-native';
import { InputEntryModel } from './inputEntry.model';
import * as parseJson from 'parse-json';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TwitterService {

  constructor() { }

  public get_tweets(): Observable<InputEntryModel[]> {
    const post_str = 'https://bits-plz-backend.herokuapp.com/search';
    return new Observable(ob => {
      request.post(post_str, (error, response, body) => { // 'body': string is the actual content
        ob.next(this.parse_response(parseJson(body)));
        if (error != null) { ob.error(error); }
      }).then(() => { ob.complete(); });
    });
  }

  private parse_response(raw): InputEntryModel[] {
    const tweet_list: InputEntryModel[] = [];
    for (const tweet of raw.statuses) {
      tweet_list.push({
        title: null,
        region: tweet.user.location === '' ? null : tweet.user.location,
        time: tweet.created_at,
        content: tweet.text
      });
    }
    return tweet_list;
  }
}
