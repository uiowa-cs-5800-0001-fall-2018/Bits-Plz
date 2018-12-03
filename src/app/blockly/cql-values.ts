import {CQLBlocks} from './cql-blocks';

declare var Blockly: any;
declare var Code: any;

export class CQLValues {
    public static initBlocks() {
    Blockly.Blocks['result'] = {
        init: function() {
          this.appendDummyInput()
              .appendField('Result');
          this.appendValueInput('input_result')
              .setCheck(null)
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField('Type')
              .appendField(new Blockly.FieldDropdown([['value', 'input_result_value'],
              ['any', 'input_result_any'],
              ['OID', 'input_result_oid'],
              ['datetime', 'input_result_datetime']]), 'input_result_dropdown');
          this.setOutput(true, 'result');
          this.setColour(230);
       this.setTooltip('');
       this.setHelpUrl('');
        }
      };
  Blockly.Blocks['result_present'] = {
        init: function() {
          this.appendDummyInput()
              .appendField('Result Present')
              .appendField(new Blockly.FieldCheckbox('TRUE'), 'NAME');
          this.setOutput(true, 'result_present');
          this.setColour(230);
       this.setTooltip('To indicate presence of any result');
       this.setHelpUrl('');
        }
      };
      Blockly.Blocks['result_value'] = {
        init: function() {
          this.appendDummyInput()
              .appendField(new Blockly.FieldDropdown(CQLBlocks.Msg.DROPDOWN.RESULT), 'result_op')
              .appendField(new Blockly.FieldTextInput('0.0'), 'result_value_number')
              .appendField('units')
              .appendField(new Blockly.FieldTextInput('none'), 'result_units');
          this.setOutput(true, 'result_value');
          this.setColour(230);
       this.setTooltip('Enter value followed by units');
       this.setHelpUrl('');
        }
      };
      Blockly.Blocks['datetime_value'] = {
        init: function() {
          this.appendDummyInput()
              .appendField('Date')
              .appendField(new Blockly.FieldDate('MM/DD/YYY'), 'dt_date')
              .appendField('Time')
              .appendField(new Blockly.FieldTextInput('00:00'), 'dt_time');
          this.setOutput(true, 'datetime_value');
          this.setColour(230);
       this.setTooltip('A date and time');
       this.setHelpUrl('');
        }
      };
      Blockly.Blocks['interval'] = {
        init: function() {
          this.appendDummyInput()
              .appendField('Period type:')
              .appendField(new Blockly.FieldDropdown([['Relevant period', 'period_type_rel'],
               ['Prevalence period', 'period_type_pre'],
               ['Participation period', 'period_type_part'],
               ['Location periods', 'period_type_loc']]), 'period_type');
          this.appendDummyInput()
              .appendField('Start Date')
              .appendField(new Blockly.FieldDate('default'), 'start_date')
              .appendField('Start Time')
              .appendField(new Blockly.FieldTextInput('00:00'), 'start_time');
          this.appendDummyInput()
              .appendField('End Date')
              .appendField(new Blockly.FieldDate('default'), 'end_date')
              .appendField('  End Time')
              .appendField(new Blockly.FieldTextInput('00:00'), 'end_time');
          this.setOutput(true, 'interval');
          this.setColour(230);
       this.setTooltip('');
       this.setHelpUrl('');
        }
      };
      Blockly.Blocks['component'] = {
        init: function() {
          this.appendDummyInput()
            .appendField('Code')
            .appendField(new Blockly.FieldTextInput('code'), 'component_code')
            .appendField('Result')
              .appendField(new Blockly.FieldTextInput('result'), 'component_result');
          this.setPreviousStatement(true, 'component');
          this.setNextStatement(true, 'component');
          this.setColour(320);
       this.setTooltip('Part of a multiple value set list');
       this.setHelpUrl('');
        }
      };

      Blockly.Blocks['component_list'] = {
        init: function() {
          this.appendDummyInput()
              .appendField('Components');
          this.appendStatementInput('component_list_name')
              .setCheck('component');
          this.setOutput(true, 'component_list');
          this.setColour(330);
       this.setTooltip('');
       this.setHelpUrl('');
        }
      };
    }
}
