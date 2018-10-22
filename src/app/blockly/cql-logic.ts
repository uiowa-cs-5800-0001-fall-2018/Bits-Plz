import {CQLBlocks} from './cql-blocks';

declare var Blockly: any;

export class CQLLogic {
    public static initBlocks() {
        Blockly.Blocks['logic_union'] = {
            init: function() {
            this.appendDummyInput()
              .appendField('Union');
            this.appendStatementInput('union_statements')
              .setCheck(null);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(220);
            this.setTooltip('Union of elements or value sets');
            this.setHelpUrl('');
            }
        };
        Blockly.Blocks['logic_or'] = {
            init: function() {
              this.appendDummyInput()
                  .appendField('or');
              this.setPreviousStatement(true, null);
              this.setNextStatement(true, null);
              this.setColour(315);
           this.setTooltip('');
           this.setHelpUrl('');
            }
          };
        Blockly.Blocks['logic_and'] = {
            init: function() {
              this.appendDummyInput()
                  .appendField('and');
              this.setPreviousStatement(true, null);
              this.setNextStatement(true, null);
              this.setColour(335);
           this.setTooltip('');
           this.setHelpUrl('');
            }
        };
    }
}
