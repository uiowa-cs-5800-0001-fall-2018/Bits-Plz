import { Component, OnInit } from '@angular/core';
import {BlocksService} from '../blocks.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.css']
})
export class ResultDisplayComponent implements OnInit {
   static _gtype = 'bar';
  chart;

  constructor() {
    // this.update_type('pie');
  }

  static setGType(input: string) {
    this._gtype = input;
    alert('GType is: ' + this._gtype);
  }

  ngOnInit() {
    this.chart = echarts.init(document.getElementById('main'));
    this.setChart();
    /*this.chart.setOption({
      title: {
        text: 'Sentiment Analysis Results'
      },
      tooltip: {},
      xAxis: {
        data: ['positive', 'negative', 'neutral']
      },
      yAxis: {},
      series: [{
        name: 'number of tweets',
        type: ResultDisplayComponent._gtype,
        data: []
      }]
    });*/
  }

  setChart() {
    this.chart.setOption({
      title: {
        text: 'Sentiment Analysis Results'
      },
      tooltip: {},
      xAxis: {
        data: ['positive', 'negative', 'neutral']
      },
      yAxis: {},
      series: [{
        name: 'number of tweets',
        type: ResultDisplayComponent._gtype,
        data: []
      }]
    });
  }

  update_contents(positive: number, negative: number, neutral: number): void {
    this.chart.setOption({
      series: [{ data: [positive, negative, neutral] }]
    });
  }

  public update_type() {
    this.chart.setOption({
     // series: [{ type: ResultDisplayComponent._gtype }]
    });
  }

}
