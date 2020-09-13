import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";
import {OrdersService} from "../shared/services/order.service";
import {Subscription} from "rxjs";
import {Order} from "../shared/services/interfaces";

const STEP = 2

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html'
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tooltip') tooltipRef: ElementRef
  tooltip: MaterialInstance
  oSub: Subscription
  isFilterVisible = false;
  orders: Order[] = []
  offset = 0
  limit = STEP
  noMoreOrders: boolean = false
  loading: boolean
  reloading: boolean = false

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.reloading = true
    this.fetch()
  }

  ngAfterViewInit(): void {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef)
  }

  ngOnDestroy(): void {
    this.tooltip.destroy()
    this.oSub.unsubscribe()
  }

  private fetch() {
    const params = {
      offset: this.offset,
      limit: this.limit
    }
    this.oSub = this.orderService.fetch(params).subscribe(
      orders => {
        this.orders = this.orders.concat(orders)
        this.noMoreOrders = orders.length < STEP
        this.loading = false
        this.reloading = false
      }
    )
  }

  loadMore() {
    this.loading = true;
    this.offset += STEP
    this.fetch()
  }
}
