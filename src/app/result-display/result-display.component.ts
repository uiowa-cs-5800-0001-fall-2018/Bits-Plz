import { Component, OnInit } from '@angular/core';
import { ResultModel } from '../services/result.model';

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
  }
}
