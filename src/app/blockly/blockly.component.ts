import {Component, OnInit, ViewChild} from '@angular/core';
import {FlashMessagesService} from 'ngx-flash-messages';
import {FirebaseService} from '../services/firebase.service';
import {TwitterService} from '../services/twitter.service';
import {ResultModel} from '../services/result.model';
import {ResultDisplayComponent} from '../result-display/result-display.component';

declare var Blockly: any;

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
    private twitterService: TwitterService
  ) {
  }

  public toolbox =
    `<xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
      <category name="Sentiment Analysis" colour="#5C81A6">
        <block type="data_source"></block>
      </category>
    </xml>`;

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
    this.createBlocks();
  }

  createBlocks() {
    Blockly.Blocks['data_source'] = {
      init: function () {
        this.appendDummyInput()
          .appendField('data sources to include');
        this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField('Twitter　')
          .appendField(new Blockly.FieldImage('http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c53e.png', 17, 17, 'Twitter'))
          .appendField(new Blockly.FieldCheckbox('TRUE'), 'include_twitter');
        this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField('Yelp')
          .appendField(new Blockly.FieldImage('https://images.vexels.com/media/users/3/137424/isolated/preview/19b872cc66b8bfc0fb8d947e8728f183-yelp-icon-logo-by-vexels.png', 15, 15, 'Twitter'))
          .appendField(new Blockly.FieldCheckbox('TRUE'), 'include_yelp');
        this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField('Google Reviews')
          .appendField(new Blockly.FieldImage('http://www.stickpng.com/assets/images/5847f9cbcef1014c0b5e48c8.png', 15, 15, 'Twitter'))
          .appendField(new Blockly.FieldCheckbox('TRUE'), 'f');
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip('run a basic query');
        this.setHelpUrl('');
      }
    };
    return Blockly.inject('blocklyDiv', {toolbox: this.toolbox});
    // return Blockly.inject('blocklyDiv', {toolbox: this.data_source_block});
  }

  save_worksapce(): void {
    const msg_success = 'successfully saved current workspace!';
    const msg_fail = 'you need to login first';
    const user_name = sessionStorage.getItem('user_name');
    if (user_name) {
      const xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
      this.firebaseService.database().ref(user_name).set({
        saved_workspace: Blockly.Xml.domToText(xml)
      }).then(() => this.flashMessagesService.show(msg_success, {timeout: 10000}));
    } else {
      this.flashMessagesService.show(msg_fail, {timeout: 10000});
    }
  }

  restore_workspace(): void {
    const msg_success = 'successfully restored last saved workspace!';
    const msg_fail = 'you need to login first';
    const user_name = sessionStorage.getItem('user_name');
    if (user_name) {
      Blockly.mainWorkspace.clear();
      this.firebaseService.database().ref(user_name + '/saved_workspace')
        .on('value', xml_text_snapshot => {
          const dom = Blockly.Xml.textToDom(xml_text_snapshot.val());
          Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, dom);
          this.flashMessagesService.show(msg_success, {timeout: 10000});
        });
    } else {
      this.flashMessagesService.show(msg_fail, {timeout: 10000});
    }
  }



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
