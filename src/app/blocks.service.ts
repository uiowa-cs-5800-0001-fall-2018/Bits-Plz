import { Injectable } from '@angular/core';
declare var Blockly: any;

@Injectable()
export class BlocksService {

  constructor() { }

  private gen_tool_box(): string {
    return `<xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
      <category name="Sentiment Analysis" colour="#5C81A6">
        <block type="data_source"></block>
        <block type="display"</block>
        <block type="query"</block>
      </category>
    </xml>`;
  }

  private gen_blocks(): void {
    Blockly.Blocks['display'] = {
      init: function() {
        this.appendValueInput('query')
          .setCheck('analysis_result')
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField('query');
        this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField('display as')
          .appendField(new Blockly.FieldDropdown([['bar chart', 'bar_chart']]), 'graph_type');
        this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField('group by')
          .appendField(new Blockly.FieldDropdown([['positive/negative', 'positive_and_negative']]), 'group_by_type');
        this.setInputsInline(false);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
      }
    };
    Blockly.Blocks['query'] = {
      init: function() {
        this.appendValueInput('data_sources')
          .setCheck('string array')
          .appendField('data_sources');
        this.appendDummyInput()
          .appendField('key_word: ')
          .appendField(new Blockly.FieldTextInput('default'), 'key_word');
        this.appendDummyInput()
          .appendField('#entries from each source: ')
          .appendField(new Blockly.FieldNumber(0, 0, 100, 1), 'num_entries');
        this.appendDummyInput()
          .appendField('within')
          .appendField(new Blockly.FieldNumber(0, 0), 'radius')
          .appendField('miles of latitude')
          .appendField(new Blockly.FieldNumber(0, -90, 90), 'latitude')
          .appendField(', longitude')
          .appendField(new Blockly.FieldNumber(0, -180, 180), 'longitude');
        this.setInputsInline(false);
        this.setOutput(true, 'analysis_results');
        this.setColour(230);
        this.setTooltip('fine tune parameters of analysis');
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
          .appendField(new Blockly.FieldImage('https://images.vexels.com/media/users/3/137424/isolated/preview/19b872cc66b8bfc0fb8d94' +
            '7e8728f183-yelp-icon-logo-by-vexels.png', 15, 15, 'Twitter'))
          .appendField(new Blockly.FieldCheckbox('TRUE'), 'include_yelp');
        this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField('Google Reviews')
          .appendField(new Blockly.FieldImage('http://www.stickpng.com/assets/images/5847f9cbcef1014c0b5e48c8.png', 15, 15, 'Twitter'))
          .appendField(new Blockly.FieldCheckbox('TRUE'), 'include_google_review');
        this.setOutput(true, 'string array');
        this.setColour(230);
        this.setTooltip('check the data sources to be included in the query');
        this.setHelpUrl('');
      }
    };
  }

  public inject_blocks(div_name: string) {
    this.gen_blocks();
    Blockly.inject(div_name, {toolbox: this.gen_tool_box()});
  }
}
