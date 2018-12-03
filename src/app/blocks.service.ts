import {Injectable} from '@angular/core';
import {ResultDisplayComponent} from './result-display/result-display.component';


declare var Blockly: any;

@Injectable()
export class BlocksService {
  public static get graphType(): string {
    return this._graphType;
  }
  
  public static getGraph(block): string {
    const dropdown_graph_type = block.getFieldValue('graph_type');

    return dropdown_graph_type;
  }

  public static set graphType(value: string) {
    this._graphType = this.getGraph(Blockly.Blocks['display']);
  }
  constructor() {
  }

  static _graphType: string;

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

  public static clear(): void {
    Blockly.mainWorkspace.clear();
  }

  static xml_to_code(xmlText) {
    let dom: any;
    try {
      dom = Blockly.Xml.textToDom(xmlText);
    } catch (e) {
      alert(e);
      return;
    }
    // Create a headless workspace.
    const demoWorkspace = new Blockly.Workspace();
    Blockly.Xml.domToWorkspace(dom, demoWorkspace);
    return Blockly.JavaScript.workspaceToCode(demoWorkspace);
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
        this.appendDummyInput()
          .setAlign(Blockly.ALIGN_CENTRE)
          .appendField('DISPLAY');
        this.appendDummyInput()
          .appendField('display as:')
          .appendField(new Blockly.FieldDropdown([['bar graph', 'bar'], ['pie chart', 'pie']]), 'graph_type');
        this.appendDummyInput()
          .appendField('group by:')
          .appendField(new Blockly.FieldDropdown([['positive/negative', 'pos_neg']]), 'graph_content');
        this.setOutput(true, null);
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('');
      }
    };


    // Data Source definition.
    Blockly.Blocks['data_sources'] = {
      init: function () {
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
        this.appendValueInput('display')
          .setCheck(null)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField('display:');
        this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField('within')
          .appendField(new Blockly.FieldNumber(0, 0), 'radius')
          .appendField('mi of lat')
          .appendField(new Blockly.FieldNumber(0, -90, 90), 'lat')
          .appendField(', lon')
          .appendField(new Blockly.FieldNumber(0, -180, 180), 'lon');
        this.setInputsInline(false);
        this.setColour(230);
        this.setTooltip('data sources to use in sentiment analysis');
        this.setHelpUrl('');
      }
    };

    // Display Block generator.
    Blockly.JavaScript['display'] = function (block) {
      let dropdown_graph_type = block.getFieldValue('graph_type');
      ResultDisplayComponent.setGType(dropdown_graph_type);
      // let dropdown_graph_content = block.getFieldValue('graph_content');
      return [dropdown_graph_type, Blockly.JavaScript.ORDER_NONE];
    };
    

    // Data Source Block generator.
    Blockly.JavaScript['data_sources'] = function (block) {
      // const checkbox_include_twitter = block.getFieldValue('include_twitter') == 'TRUE';
      // const checkbox_include_yelp = block.getFieldValue('include_yelp') == 'TRUE';
      // const checkbox_include_google_review = block.getFieldValue('include_google_review') == 'TRUE';
      let value_display = Blockly.JavaScript.valueToCode(block, 'display', Blockly.JavaScript.ORDER_ATOMIC);
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
}
