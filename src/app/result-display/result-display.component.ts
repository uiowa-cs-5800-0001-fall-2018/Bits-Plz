import { Component, OnInit } from '@angular/core';
import { ResultModel } from '../services/result.model';

// declare var require: any;
// const echarts = require('echarts');

import * as echarts from 'echarts';

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.css']
})
export class ResultDisplayComponent implements OnInit {

  results: ResultModel[];

  constructor() {
    this.results = [
      {
        content: 'cats can fly',
        score: 10
      },
      {
        content: 'cats can eat',
        score: 5
      },
      {
        content: 'cats do not explode',
        score: 30
      },
      {
        content: 'cats have fur',
        score: 0
      }
    ];
  }

  ngOnInit() {
    const myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
      title: {
        text: 'Sentiment Analysis Results'
      },
      tooltip: {},
      xAxis: {
        data: ['positive', 'negative']
      },
      yAxis: {},
      series: [{
        name: 'number of tweets',
        type: 'bar',
        data: [10, 20]
      }]
    });
  }
}
