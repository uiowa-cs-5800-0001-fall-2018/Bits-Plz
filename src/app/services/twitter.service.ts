import { Injectable } from '@angular/core';
import * as request from 'request-promise-native';
import { ResultModel } from './result.model';
import * as parseJson from 'parse-json';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TwitterService {

  constructor() { }

  public get_tweets(req: string): Observable<ResultModel[]> {
    return new Observable(ob => {
      request.post(req, (error, response, body) => { // 'body': string is the actual content
        ob.next(parseJson(body));
        if (error != null) { ob.error(error); }
      }).then(() => { ob.complete(); });
    });
  }


}
