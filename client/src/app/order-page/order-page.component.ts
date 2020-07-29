import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";
import {OrderService} from "./order.service";
import {OrderPosition} from "../shared/services/interfaces";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private router: Router,
              public order: OrderService) { }

  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance
  isRoot: boolean

  ngOnInit(): void {
    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order'
      }
    })
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy(): void {
    this.modal.destroy()
  }

  open() {
    this.modal.open()
  }

  cancel() {
    this.modal.close()
  }

  submit() {

  }

  removePosition(item: OrderPosition) {
    this.order.remove(item)
  }
}
