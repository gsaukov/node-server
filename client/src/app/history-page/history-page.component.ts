import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html'
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tooltip') tooltipRef: ElementRef
  tooltip: MaterialInstance
  isFilterVisible = false;

  constructor() { }

  ngOnInit(): void {
    MaterialService
  }

  ngAfterViewInit(): void {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef)
  }

  ngOnDestroy(): void {
    this.tooltip.destroy()
  }

}
