import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PositionsService} from "../../../shared/services/positions.service";
import {Position} from "../../../shared/services/interfaces";
import {MaterialInstance, MaterialService} from "../../../shared/classes/material.service";


@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html'
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private positionsService: PositionsService) { }

  @Input('categryId') categoryId
  @ViewChild('modal') modalRef: ElementRef
  positions: Position[] = []
  loading = false;
  modal: MaterialInstance

  ngOnInit(): void {
    this.loading = true;
    // debugger
    this.positionsService.fetch(this.categoryId).subscribe(
      positions => {
        this.positions = positions
        this.loading = false
      }
    )
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy()
  }

  onSelectedPosition(position: Position) {
    this.modal.open()
  }

  onAddPosition() {
    this.modal.open()
  }

  onCancel() {
    this.modal.close()
  }

  onSave() {

  }
}
