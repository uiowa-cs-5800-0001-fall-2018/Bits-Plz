import {Component, OnInit, ViewChild} from '@angular/core';
import {FlashMessagesService} from 'ngx-flash-messages';
import {FirebaseService} from '../services/firebase.service';
import {TwitterService} from '../services/twitter.service';
import {ResultModel} from '../services/result.model';
import {ResultDisplayComponent} from '../result-display/result-display.component';
import {BlocksService} from '../blocks.service';
import swal from 'sweetalert2';
import * as $ from 'jquery';
import {Observable} from 'rxjs/Observable';
import {forEach} from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.css']
})
export class BlocklyComponent implements OnInit {

  resultDisplay;
  workspace_list: {id, name}[];
  tweet_list: {content, score}[];
  INVALID_NAME: 'Name entered was invalid';
  MSG_SUCCESS = 'Your work has been saved';
  NEED_LOGIN = 'you need to login first';
  SUBSCRIBE_OPTIONS = {
    'unsubscribe': 'unsubscribe',
    'hourly': 'Hourly',
    'daily': 'Daily',
    'weekly': 'Weekly',
    'monthly': 'Monthly'
  };

  constructor(
    private flashMessagesService: FlashMessagesService,
    private firebaseService: FirebaseService,
    private twitterService: TwitterService,
  ) {

  }

  private get_all_subscriptions(name: string): Observable<string[]> {
    const res: string[] = [];
    const exp_name = `${sessionStorage.getItem('user_name')}-${name}`;
    return Observable.create(async ob => {
      for (const option in this.SUBSCRIBE_OPTIONS) {
        await this.firebaseService.database().ref(`auto notifications/${option}`)
          .once('value', (snapshot) => {
          if (snapshot.hasChild(exp_name)) {
            res.push(option);
          }
        }).then();
      }
      ob.next(res);
      ob.complete();
    });
  }

  private unsubscribe(name: string) {
    let unsubscribed: boolean;
    this.get_all_subscriptions(name).subscribe({
      next: intervals => {
        const input_options = {};
        for (const interval of intervals) {
          input_options[interval] = interval;
        }
        swal({
          title: 'Which notification interval would you like to unsubscribe?',
          input: 'select',
          inputOptions: input_options,
          inputPlaceholder: 'Select an interval to unsubscribe',
          showCancelButton: true,
          inputValidator: value => {
            unsubscribed = value === 'Select an interval to unsubscribe';
            return new Promise((resolve) => {
              this.firebaseService.database().
                ref(`auto notifications/${value}/${sessionStorage.getItem('user_name')}-${name}`)
                .remove().then();
              resolve();
            });
          }
        }).then(() => {
          if (unsubscribed) {
            BlocklyComponent.swal_error('No unsubscription was made');
          } else {
            BlocklyComponent.swal_notice('Successfully Unsubscribed');
          }
        });
      },
      error: err => { console.log(err); },
      complete: () => {}
    });
  }

  private static calc_distribution(arr: ResultModel[]) {
    let positive = 0;
    let negative = 0;
    let neutral = 0;
    for (const res of arr) {
      if (res.score > 0) {
        positive++;
      } else if (res.score < 0) {
        negative++;
      } else {
        neutral++;
      }
    }
    return {
      positive: positive,
      negative: negative,
      neutral: neutral
    };
  }

  private static swal_notice(notice: string): Promise<any> {
    return swal('Success!', notice, 'success');
  }

  private static swal_error(notice: string): Promise<any> {
    return swal('Failed!', notice, 'error');
  }

  ngOnInit() {
    const user_name = sessionStorage.getItem('user_name');
    const usersRef = this.firebaseService.database().ref(user_name);
    BlocksService.inject_blocks('blocklyDiv');
    usersRef.on('value', (data) => {
      this.workspace_list = [];  // TODO add just the workspace changed (O(1) time, currently O(n))
      const savespace = data.val();
      const keys = Object.keys(savespace);
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const name = savespace[k].name;
        this.workspace_list.push({'id': i, 'name': name});
      }
    }, (err) => {
      console.log(err);
    });
  }

  private load_workspace(name: string): void {
    const ref = sessionStorage.getItem('user_name') + '/' + name;
    this.firebaseService.database().ref(ref).once('value')
      .then((dataSnapshot) => {
        BlocksService.xml_string_to_workspace(dataSnapshot.val().workspace);
      });
    BlocklyComponent.swal_notice('Your workspace was loaded successfully');
  }

  private async delete_workspace(workspace_name: string) {
    const user_name = sessionStorage.getItem('user_name');
    const usersRef = this.firebaseService.database().ref(user_name);
    usersRef.child(workspace_name).remove().then();
    BlocksService.clear();
    BlocklyComponent.swal_notice('Your workspace has been deleted').then();
  }

  async save_workspace() {
    const user_name = sessionStorage.getItem('user_name');
    if (user_name) {
      // get name of the workspace
      const {value: workspace} = await swal({
        title: 'What name would you like to save this workspace as?',
        input: 'text',
        showCancelButton: true,
        inputValidator: (value) => {
          return !value && 'You need to write something!';
        }
      });
      if (workspace) {
        const usersRef = this.firebaseService.database().ref(user_name + '/' + workspace);
        usersRef.set({
          name: workspace,
          workspace: BlocksService.workspace_to_xml_string()
        }).then();
        BlocklyComponent.swal_notice(this.MSG_SUCCESS).then();
      } else {
        BlocklyComponent.swal_notice(this.INVALID_NAME).then();
      }
    } else {
      BlocklyComponent.swal_error(this.NEED_LOGIN).then();
    }
  }

  button_callback(workspace_name: string) {
    $(document).on('click', '.SwalBtn1', () => {
      this.load_workspace(workspace_name);
    });
    $(document).on('click', '.SwalBtn2', () => {
      this.delete_workspace(workspace_name).then();
    });
    $(document).on('click', '.SwalBtn3', () => {
      swal({
        title: 'Select Notification Intervals',
        input: 'select',
        inputOptions: this.SUBSCRIBE_OPTIONS,
        inputPlaceholder: 'Select an Interval',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise(async (resolve) => {

            const db = this.firebaseService.database();
            const user_name = sessionStorage.getItem('user_name');
            const user_email = sessionStorage.getItem('user_email');
            const note_ref_str = `auto notifications/${value}/${user_name}-${workspace_name}`;
            const workspace_ref_str = `${user_name}/${workspace_name}`;

            if (!value) {
              resolve('You must select an interval');
            } else if (value === 'unsubscribe') {
              this.unsubscribe(workspace_name);
            } else {
              const ob = {
                keyword: null,
                count: null
              };
              db.ref(workspace_ref_str).once('value').then((dataSnapshot) => {
                const code = BlocksService.xml_to_code(dataSnapshot.val().workspace)
                  .replace('?', '').replace('\n', '').replace(';', '').split('&');
                for (const pair of code) {
                  const splitted = pair.split('=');
                  ob[splitted[0]] = splitted[1];
                }
              }).then(() => {
                console.log(ob.keyword, ob.count);
                db.ref(note_ref_str).set({
                  keyword: ob.keyword,
                  count: ob.count,
                  email: user_email
                }).then();
              });
              BlocklyComponent.swal_notice('Your notifications were successfully setup').then(() => { resolve(); });
              this.twitterService.sample_email(ob.keyword, ob.count, sessionStorage.getItem('user_email'));
            }
          });
        }
      }).then();
    });

    swal({
      title: 'Title',
      html:
        '<button type="button" role="button" tabindex="0" class="SwalBtn1 customSwalBtn">' + 'Load' + '</button>' +
        '<button type="button" role="button" tabindex="0" class="SwalBtn2 customSwalBtn">' + 'Delete' + '</button>' +
        '<button type="button" role="button" tabindex="0" class="SwalBtn3 customSwalBtn">' + 'Set Up Notifications' + '</button>',
      showCancelButton: false,
      showConfirmButton: false
    }).then();
  }

  @ViewChild(ResultDisplayComponent)
  set resultDisplayComponent(resultDisplay: ResultDisplayComponent) {
    this.resultDisplay = resultDisplay;
  }

  run_query(): void {
    this.twitterService.get_tweets(BlocksService.show_code()).subscribe({
      next: x => {
        const distribution = BlocklyComponent.calc_distribution(x);
        this.resultDisplay.update_contents(
          distribution.positive,
          distribution.negative,
          distribution.neutral
        );
        this.tweet_list = [];
        for (let i = 0; i < x.length; i++) {
          console.log(x[i].content);
          this.tweet_list.push( { 'content': x[i].content, 'score': x[i].score} );
        }

        function keysrt(key) {
          return function(a, b) {
            if (a[key] > b[key]) return 1;
            if (a[key] < b[key]) return -1;
            return 0;
          }
        }

        this.tweet_list.sort(keysrt('score'));

      },
      error: err => console.log('cannot update, ', err),
      complete: () => console.log('query completed')
    });
  }
}
