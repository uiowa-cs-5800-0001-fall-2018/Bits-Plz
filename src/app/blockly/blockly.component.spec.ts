import { async, ComponentFixture, TestBed } from '@angular/core/testing';
declare var Blockly: any;
import { BlocklyComponent } from './blockly.component';

describe('BlocklyComponent', () => {
  let component: BlocklyComponent;
  let fixture: ComponentFixture<BlocklyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocklyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

Blockly.Blocks['data'] = {
  init: function() {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField("Data");
    this.appendStatementInput("source")
      .setCheck("Source")
      .appendField("Sources");
    this.appendStatementInput("source")
      .setCheck("Action")
      .appendField("Actions");
    this.appendStatementInput("presentation")
      .setCheck("Present")
      .appendField("Presentations");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip("A single piece of data, has three main attributes: sources, presentation, and action.");
    this.setHelpUrl("");
  }
};
