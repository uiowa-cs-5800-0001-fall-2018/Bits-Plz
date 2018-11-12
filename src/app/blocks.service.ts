import { Injectable } from '@angular/core';
declare var Blockly: any;

@Injectable()
export class BlocksService {

  constructor() { }

  private static gen_tool_box(): string {
    return `<xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
      <category name="Sentiment Analysis" colour="#5C81A6">
        <block type="data_sources"></block>
        <block type="display"></block>
      </category>
    </xml>`;
  }

  private static gen_blocks(): void {
    Blockly.Blocks['display'] = {
      init: function() {
        this.appendValueInput('display')
          .setCheck('analysis_results')
          .appendField('display');
        this.appendDummyInput()
          .appendField('display as')
          .appendField(new Blockly.FieldDropdown([['bar chart', 'bar_chart']]), 'graph_type');
        this.appendDummyInput()
          .appendField('group by')
          .appendField(new Blockly.FieldDropdown([['positive/negative', 'positive_and_negative']]), 'group_by_type');
        this.setInputsInline(false);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
      }
    };
    Blockly.Blocks['data_sources'] = {
      init: function() {
        this.appendDummyInput()
          .appendField('data sources');
        this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField('Twitter　')
          .appendField(new Blockly.FieldImage('http://www.transparentpng.com/thumb/twitter/twitter-transparent-images--7.png', 15, 15,
            'Twitter'))
          .appendField(new Blockly.FieldCheckbox('TRUE'), 'include_twitter');
        this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField('Yelp')
          .appendField(new Blockly.FieldImage('https://images.vexels.com/media/users/3/137424/isolated/preview/19b872cc66b8bfc0fb8d' +
            '947e8728f183-yelp-icon-logo-by-vexels.png', 15, 15, 'Twitter'))
          .appendField(new Blockly.FieldCheckbox('TRUE'), 'include_yelp');
        this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField('Google Reviews')
          .appendField(new Blockly.FieldImage('http://www.stickpng.com/assets/images/5847f9cbcef1014c0b5e48c8.png', 15, 15, 'Twitter'))
          .appendField(new Blockly.FieldCheckbox('TRUE'), 'include_google_review');
        this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField('key_word: ')
          .appendField(new Blockly.FieldTextInput('default'), 'key_word');
        this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField('#entries from each source: ')
          .appendField(new Blockly.FieldNumber(0, 0, 100, 1), 'num_entries');
        this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField('within')
          .appendField(new Blockly.FieldNumber(0, 0), 'radius')
          .appendField('mi of lat')
          .appendField(new Blockly.FieldNumber(0, -90, 90), 'lat')
          .appendField(', lon')
          .appendField(new Blockly.FieldNumber(0, -180, 180), 'lon');
        this.setInputsInline(false);
        this.setOutput(true, 'analysis_results');
        this.setColour(230);
        this.setTooltip('data sources to use in sentiment analysis');
        this.setHelpUrl('');
      }
    };
  }

  static inject_blocks(div_name: string) {
    BlocksService.gen_blocks();
    // noinspection TypeScriptValidateJSTypes
    Blockly.inject(div_name, {toolbox: BlocksService.gen_tool_box()});
  }
}
