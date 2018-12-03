import { Injectable } from '@angular/core';
declare var Blockly: any;

@Injectable()
export class BlocksService {

  constructor() {
  }

  public static inject_blocks(div_name: string) {
    BlocksService.gen_blocks();
    BlocksService.gen_generators();
    // noinspection TypeScriptValidateJSTypes
    Blockly.inject(div_name, {toolbox: BlocksService.gen_tool_box()});
  }

  public static workspace_to_xml_string(): string {
    return Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
  }

  public static xml_string_to_workspace(xml_string: string): void {
    Blockly.mainWorkspace.clear();
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, Blockly.Xml.textToDom(xml_string));
  }

  // This functioned gets called from the Blockly Component
  // Generate JavaScript code and display it. Displays string as a button alert.
  public static show_code(): string {
    return 'https://bits-plz-backend.herokuapp.com/search' + Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
  }

  // This is the toolbox
  private static gen_tool_box(): string {
    return `<xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
      <category name="Sentiment Analysis" colour="#5C81A6">
        <block type="display"></block>
        <block type="data_sources"></block>
      </category>
    </xml>`;
  }

  private static gen_blocks(): void {
    Blockly.Blocks['display'] = {
      init: function () {
        this.appendValueInput('d_display')
          .setCheck(null)
          .appendField('display:');
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


    // Data Source definition.
    Blockly.Blocks['data_sources'] = {
      init: function() {
        this.appendDummyInput()
          .appendField('data sources');
        this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField('Twitter')
          .appendField(new Blockly.FieldImage('http://www.transparentpng.com/thumb/twitter/twitter-transparent-images--7.png', 15, 15,
            'Twitter'))
          .appendField(new Blockly.FieldCheckbox('TRUE'), 'include_twitter');
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
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip('data sources to use in sentiment analysis');
        this.setHelpUrl('');
      }
    };

    // Display Block generator.
    Blockly.JavaScript['display'] = function (block) {
      const text_t_input = block.getFieldValue('d_display');
      // TODO: Assemble JavaScript into code variable.
      const code = 'display-block: ' + text_t_input;
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE];
    };

    // Data Source Block generator.
    Blockly.JavaScript['data_sources'] = function (block) {
      // const checkbox_include_twitter = block.getFieldValue('include_twitter') == 'TRUE';
      // const checkbox_include_yelp = block.getFieldValue('include_yelp') == 'TRUE';
      // const checkbox_include_google_review = block.getFieldValue('include_google_review') == 'TRUE';
      const text_key_word = block.getFieldValue('key_word');
      const num_entries = block.getFieldValue('num_entries');
      // const number_radius = block.getFieldValue('radius');
      // const number_lat = block.getFieldValue('lat');
      // const number_lon = block.getFieldValue('lon');
      // const value_b_twitter = Blockly.JavaScript.valueToCode(block, 'b_twitter', Blockly.JavaScript.ORDER_ATOMIC);
      // Assemble JavaScript into code variable.
      const code = `?keyword=${text_key_word}&count=${num_entries}`;
      // Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE];
    };
  }

  private static gen_generators(): void {

  }

  public static clear(): void {
    Blockly.mainWorkspace.clear();
  }
}
