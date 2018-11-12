import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.css']
})
export class ResultDisplayComponent implements OnInit {

  chart;

  constructor() { }

  ngOnInit() {
    this.chart = echarts.init(document.getElementById('main'));
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
        type: 'bar',
        data: []
      }]
    });
  }

  update_contents(positive: number, negative: number, neutral: number): void {
    this.chart.setOption({
      series: [{ data: [positive, negative, neutral] }]
    });
  }
}
