import {CQLBlocks} from './cql-blocks';

declare var Blockly: any;

export class CQLContext {
    public static initBlocks() {
      Blockly.Blocks['report'] = {
        init: function() {
          this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("REPORT");
          this.appendStatementInput("m_data")
            .setCheck("data")
            .appendField("Data:");
          this.setColour(0);
          this.setTooltip("");
          this.setHelpUrl("");
        }
      };
      Blockly.Blocks['data'] = {
        init: function() {
          this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Data");
          this.appendStatementInput("m_source")
            .setCheck("source")
            .appendField("Sources");
          this.appendStatementInput("m_action")
            .setCheck("action")
            .appendField("Actions");
          this.appendStatementInput("m_presentation")
            .setCheck("present")
            .appendField("Presentations");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(15);
          this.setTooltip("A single piece of data, has three main attributes: sources, presentation, and action.");
          this.setHelpUrl("");
        }
      };
      Blockly.Blocks['twitter'] = {
        init: function() {
          this.appendDummyInput()
            .appendField("TWITTER");
          this.appendValueInput("NAME")
            .setCheck(["sentientAnalysis", "CHANGE_THIS"])
            .appendField("DataType:");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(30);
          this.setTooltip("");
          this.setHelpUrl("");
        }
      };
      Blockly.Blocks['sentient_analysis'] = {
        init: function() {
          this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("SENTIENT ANALYSIS");
          this.setOutput(true, null);
          this.setColour(45);
          this.setTooltip("");
          this.setHelpUrl("");
        }
      };
      Blockly.Blocks['graph'] = {
        init: function() {
          this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("GRAPH");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(30);
          this.setTooltip("");
          this.setHelpUrl("");
        }
      };
      Blockly.Blocks['table'] = {
        init: function() {
          this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("TABLE");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(30);
          this.setTooltip("");
          this.setHelpUrl("");
        }
      };
      Blockly.Blocks['alert'] = {
        init: function() {
          this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("ALERT");
          this.appendStatementInput("m_type")
            .setCheck(null)
            .appendField("Type");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(30);
          this.setTooltip("");
          this.setHelpUrl("");
        }
      };
      Blockly.Blocks['text'] = {
        init: function() {
          this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("TEXT");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(45);
          this.setTooltip("");
          this.setHelpUrl("");
        }
      };

    }
}

