import {Component, OnInit, ViewChild} from '@angular/core';
import {FlashMessagesService} from 'ngx-flash-messages';
import {FirebaseService} from '../services/firebase.service';
import {TwitterService} from '../services/twitter.service';
import {ResultModel} from '../services/result.model';
import {ResultDisplayComponent} from '../result-display/result-display.component';
import {BlocksService} from '../blocks.service';
import swal from 'sweetalert2';
import * as $ from 'jquery';


@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.css']
})
export class BlocklyComponent implements OnInit {

  resultDisplay;
  workspace_list: { id, name }[];
  MSG_SUCCESS = 'Your work has been saved';
  NEED_LOGIN = 'you need to login first';

  constructor(
    private flashMessagesService: FlashMessagesService,
    private firebaseService: FirebaseService,
    private twitterService: TwitterService,
  ) {

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

  private static swal_notice(notice: string): void {
    swal('Success!', notice, 'success').then();
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
    BlocklyComponent.swal_notice('Your work has been deleted');
  }

  async save_workspace() {

    // get name of the workspace
    const {value: workspace} = await swal({
      title: 'What name would you like to save this workspace as?',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        return !value && 'You need to write something!';
      }
    });

    const user_name = sessionStorage.getItem('user_name');
    const usersRef = this.firebaseService.database().ref(user_name + '/' + workspace);
    if (user_name && workspace != null) {
      usersRef.set({
        name: workspace,
        workspace: BlocksService.workspace_to_xml_string()
      }).then();
      BlocklyComponent.swal_notice(this.MSG_SUCCESS);
    } else {
      BlocklyComponent.swal_notice(this.NEED_LOGIN);
    }
  }

  button_callback(workspace_name: string) {
    $(document).on('click', '.SwalBtn1', () => {
      this.load_workspace(workspace_name);
    });
    $(document).on('click', '.SwalBtn2', () => {
      this.delete_workspace(workspace_name).then();
      swal(
        'Success!',
        'Workspace successfully deleted!',
        'success'
      ).then();
    });
    $(document).on('click', '.SwalBtn3', () => {
      swal({
        title: 'Select Notification Intervals',
        input: 'select',
        inputOptions: {
          'hourly': 'Hourly',
          'daily': 'Daily',
          'weekly': 'Weekly',
          'monthly': 'Monthly'
        },
        inputPlaceholder: 'Select an Interval',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise(async (resolve) => {
            if (!value) {
              resolve('You must select an interval');
            } else {
              const db = this.firebaseService.database();
              const user_name = sessionStorage.getItem('user_name');
              const user_email = sessionStorage.getItem('user_email');
              const note_ref_str = `auto notifications/${value}/${user_name}-${workspace_name}`;
              const workspace_ref_str = `${user_name}/${workspace_name}`;

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
              swal(
                'Success!',
                'Your notifications were successfully setup',
                'success'
              ).then(function() { resolve(); });
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

  updateGraph() {
    this.resultDisplay.setChart();
  }

  show_code(): void {
    // Generate JavaScript code and display it.
    alert(BlocksService.show_code());
  }

  run_query(): void {
    this.twitterService.get_tweets(BlocksService.show_code()).subscribe({
      next: x => {
        const distribution = BlocklyComponent.calc_distribution(x);
        this.updateGraph();
        this.resultDisplay.update_contents(
          distribution.positive,
          distribution.negative,
          distribution.neutral
        );
      },
      error: err => console.log('cannot update, ', err),
      complete: () => console.log('query completed')
    });
  }
}
