import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../../shared/services/interfaces";

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html'
})
export class HistoryListComponent implements OnInit {
  @Input() orders: Order[]

  constructor() { }

  ngOnInit(): void {
  }

}
