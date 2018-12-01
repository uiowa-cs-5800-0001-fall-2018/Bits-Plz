import { Injectable } from '@angular/core';
import * as request from 'request-promise-native';
import { ResultModel } from './result.model';
import * as parseJson from 'parse-json';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TwitterService {

  private static parse_response(raw): ResultModel[] {
    const tweet_list: ResultModel[] = [];
    for (const tweet of raw.statuses) {
      tweet_list.push({
        title: null,
        region: tweet.user.location === '' ? null : tweet.user.location,
        time: tweet.created_at,
        content: tweet.text,
        score: 0
      });
    }
    return tweet_list;
  }

  constructor() { }

  public get_tweets(): Observable<ResultModel[]> {
    const post_str = 'https://bits-plz-backend.herokuapp.com/search';//?keyword=hi
    return new Observable(ob => {
      request.post(post_str, (error, response, body) => { // 'body': string is the actual content
        ob.next(parseJson(body));
        if (error != null) { ob.error(error); }
      }).then(() => { ob.complete(); });
    });
  }


}
