import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PositionsService} from "../../../shared/services/positions.service";
import {Position} from "../../../shared/services/interfaces";
import {MaterialInstance, MaterialService} from "../../../shared/classes/material.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html'
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private positionsService: PositionsService) { }

  @Input('categryId') categoryId
  @ViewChild('modal') modalRef: ElementRef
  positions: Position[] = []
  positionId = null
  loading = false
  modal: MaterialInstance
  form: FormGroup

  ngOnInit(): void {
    this.loading = true;
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")])
    })
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
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    })
    this.positionId = position._id
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onAddPosition() {
    this.positionId = null
    this.form.reset({
      name: '',
      cost: 1
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onCancel() {
    this.modal.close()
  }

  onSubmit() {
    this.form.disable()
    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    }

    const completed = () => {
      this.modal.close()
      this.form.reset({name: '', cost: 1})
      this.form.enable()
    }

    if(this.positionId){
      newPosition._id = this.positionId
      this.positionsService.update(newPosition).subscribe(
        (position) => {
          const idx = this.positions.findIndex(p => p._id === position._id)
          this.positions[idx] = position
          MaterialService.toast('Position was updated')
        },
        (error) => {
          this.form.enable()
          MaterialService.toast(error.error.message)
        },
        completed
      )
    } else {
      this.positionsService.create(newPosition).subscribe(
        (position) => {
          MaterialService.toast('Position was added')
          this.positions.push(position)
        },
        (error) => {
          this.form.enable()
          MaterialService.toast(error.error.message)
        },
        completed
      )
    }

  }

  onDeletePosition(event: Event, position: Position) {
    event.stopPropagation();
    const decision = window.confirm(`Delete position ${position.name}?`)
    this.positionsService.delete(position).subscribe(
      (message) => {
        MaterialService.toast('Position was deleted')
        const idx = this.positions.findIndex(p => p._id === position._id)
        this.positions.splice(idx,1)
      },
      (error) => {
        MaterialService.toast(error.error.message)
      },
    )
  }

}
