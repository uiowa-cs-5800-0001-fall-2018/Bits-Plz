import { Injectable } from '@angular/core';
declare var Blockly: any;

@Injectable()
export class BlocksService {

  constructor() { }

  /*public static canvasDefinition = `<xml id="toolbox" style="display: none">
  <category name="Sentiment Analysis" colour="#5C81A6"> 
    <block type="data_sources"></block>
    <block type="display"></block>
  </category>
  </xml>`;*/


  private static gen_tool_box(): string {
    return `<xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
      <category name="Sentiment Analysis" colour="#5C81A6">
        <block type="data_sources"></block>
        <block type="display"></block>
      </category>
    </xml>`;
  }

  /*
  Blockly.Blocks['test'] = {
    init: function() {
      this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("TEST BLOCK");
      this.appendDummyInput()
        .appendField("Variable:")
        .appendField(new Blockly.FieldTextInput("default"), "m_variable");
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };*/


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

    /*
    Blockly.JavaScript['display'] = function(block)
    {
      let checkbox_include_twitter = block.getFieldValue('include_twitter') == 'TRUE';
      let checkbox_include_yelp = block.getFieldValue('include_yelp') == 'TRUE';
      let checkbox_include_google_review = block.getFieldValue('include_google_review') == 'TRUE';
      let text_key_word = block.getFieldValue('key_word');
      let number_num_entries = block.getFieldValue('num_entries');
      let number_radius = block.getFieldValue('radius');
      let number_lat = block.getFieldValue('lat');
      let number_lon = block.getFieldValue('lon');
      //  Assemble JavaScript into code variable.
      let code = 'TESSTING DISPLAY BLOCK';
      // Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE];
    }; */

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

    Blockly.JavaScript['data_sources'] = function(block) {

      var checkbox_include_twitter = block.getFieldValue('include_twitter') == 'TRUE';
      var checkbox_include_yelp = block.getFieldValue('include_yelp') == 'TRUE';
      var checkbox_include_google_review = block.getFieldValue('include_google_review') == 'TRUE';
      var text_key_word = block.getFieldValue('key_word');
      var number_num_entries = block.getFieldValue('num_entries');
      var number_radius = block.getFieldValue('radius');
      var number_lat = block.getFieldValue('lat');
      var number_lon = block.getFieldValue('lon');
      // TODO: Assemble JavaScript into code variable.
      var code = 'Testing key_work is: ' + text_key_word;
      // TODO: Change ORDER_NONE to the correct strength.
      //return [code, Blockly.JavaScript.ORDER_NONE];
      return code;
    };
  }

  private static gen_query_string(
    include_twitter: boolean = false,
    include_yelp: boolean = false,
    include_google_review: boolean = false,
    key_word: string = 'UIowa',
    num: number = 15,
    lat: number = 41.6611,
    lon: number = 91.5302,
    radius: number = 50
  ): string {

    return '0';
  }


  private static gen_generators(): void {

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

  // I don't know if this works, but I need the blocks to be able to display the data as string.
  // So that I can  read the variable data.
  /*
  public static workspace_to_normal_string(): string {
    return Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
  }*/

  public static xml_string_to_workspace(xml_string: string): void {
    Blockly.mainWorkspace.clear();
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, Blockly.Xml.textToDom(xml_string));
  }

  public static show_code(): void {
    // Generate JavaScript code and display it.
    alert('test\n' + Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace));
  }

  public static execute_code(): void {
    // Generate JavaScript code and display it.
    // var code = Blockly.Javascript.workspaceToCode(Blockly.mainWorkspace);
    // return Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
    // alert('THIS NEEDS TO EXECUTE THE CODE' + Blockly.Xml.workspaceToCode(Blockly.mainWorkspace));
  }

}
