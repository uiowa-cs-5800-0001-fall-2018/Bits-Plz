'use strict';

goog.provide('Blockly.JavaScript.texts');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['result'] = function(block) {
  // Text value.
  var code = 'The result is a result';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['data'] = function(block) {
  var statements_m_source = Blockly.JavaScript.statementToCode(block, 'm_source');
  var statements_m_action = Blockly.JavaScript.statementToCode(block, 'm_action');
  var statements_m_presentation = Blockly.JavaScript.statementToCode(block, 'm_presentation');

  var code = "Source: " + statements_m_source + '\nAction: ' + statements_m_action + '\nPresentation: ' + statements_m_presentation + '\n';
  return code;
};
