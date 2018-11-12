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
    private blocksService: BlocksService
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
    console.log('updated, positive: ', positive, ', negative: ', negative, 'neutral: ', neutral);
    return {
      positive: positive,
      negative: negative,
      neutral: neutral
    };
  }

  ngOnInit() {
    this.blocksService.inject_blocks('blocklyDiv');
  }

  // save_worksapce(): void {
  //   const msg_success = 'successfully saved current workspace!';
  //   const msg_fail = 'you need to login first';
  //   const user_name = sessionStorage.getItem('user_name');
  //   if (user_name) {
  //     const xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  //     this.firebaseService.database().ref(user_name).set({
  //       saved_workspace: Blockly.Xml.domToText(xml)
  //     }).then(() => this.flashMessagesService.show(msg_success, {timeout: 10000}));
  //   } else {
  //     this.flashMessagesService.show(msg_fail, {timeout: 10000});
  //   }
  // }
  //
  // restore_workspace(): void {
  //   const msg_success = 'successfully restored last saved workspace!';
  //   const msg_fail = 'you need to login first';
  //   const user_name = sessionStorage.getItem('user_name');
  //   if (user_name) {
  //     Blockly.mainWorkspace.clear();
  //     this.firebaseService.database().ref(user_name + '/saved_workspace')
  //       .on('value', xml_text_snapshot => {
  //         const dom = Blockly.Xml.textToDom(xml_text_snapshot.val());
  //         Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, dom);
  //         this.flashMessagesService.show(msg_success, {timeout: 10000});
  //       });
  //   } else {
  //     this.flashMessagesService.show(msg_fail, {timeout: 10000});
  //   }
  // }



  @ViewChild(ResultDisplayComponent)
  set resultDisplayComponent (resultDisplay: ResultDisplayComponent) {
    this.resultDisplay = resultDisplay;
    console.log('successfully captured child component: ', resultDisplay);
  }
  run_query(): void {
    this.twitterService.get_tweets().subscribe({
      next: x => {
        console.log(typeof x);
        console.log(x);
        console.log(x.length);
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
