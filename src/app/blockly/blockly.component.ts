import {Component, OnInit, ViewChild} from '@angular/core';
import {FlashMessagesService} from 'ngx-flash-messages';
import {FirebaseService} from '../services/firebase.service';
import {TwitterService} from '../services/twitter.service';
import {ResultModel} from '../services/result.model';
import {ResultDisplayComponent} from '../result-display/result-display.component';
import {BlocksService} from '../blocks.service';


@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.css']
})
export class BlocklyComponent implements OnInit {

  resultDisplay;

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

  ngOnInit() {
    BlocksService.inject_blocks('blocklyDiv');
  }

  gotData(data) {
    const save = prompt('Please enter the name of the saved workspace:', '');
    const savespace = data.val();
    const keys = Object.keys(savespace);
    console.log(keys);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      const name = savespace[k].name;
      const workspace = savespace[k].workspace;
      console.log(name);
      console.log(workspace);
      if (name === save) {
        BlocksService.xml_string_to_workspace(workspace);
      }
     
    }
  }

  errData(err) {
    console.log('Error!');
    console.log(err);
  }

  save_worksapce(): void {
    const workspace = prompt('Please enter the name of the saved workspace:', '');
    const msg_success = 'successfully saved current workspace!';
    const msg_fail = 'you need to login first';
    const user_name = sessionStorage.getItem('user_name');
    const usersRef = this.firebaseService.database().ref(user_name);
    if (user_name && workspace != null) {
      const userRef = usersRef.push({
        name: workspace,
        workspace: BlocksService.workspace_to_xml_string()
      }).then(() => this.flashMessagesService.show(msg_success, {timeout: 10000}));
    } else {
      this.flashMessagesService.show(msg_fail, {timeout: 10000});
    }
  }

  restore_workspace(): void {
    const msg_success = 'successfully restored last saved workspace!';
    const msg_fail = 'you need to login first';
    const user_name = sessionStorage.getItem('user_name');
    const usersRef = this.firebaseService.database().ref(user_name);

    if (user_name) {
      usersRef.on('value', this.gotData, this.errData);
    }
  }



  @ViewChild(ResultDisplayComponent)
  set resultDisplayComponent (resultDisplay: ResultDisplayComponent) {
    this.resultDisplay = resultDisplay;
    console.log('successfully captured child component: ', resultDisplay);
  }
  run_query(): void {
    // TODO get_tweets takes a URL query string generated from workspace blocks and respond accordingly
    this.twitterService.get_tweets().subscribe({
      next: x => {
        const distribution = BlocklyComponent.calc_distribution(x);
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
