import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {MaterialService} from "../../shared/classes/material.service";


@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent implements OnInit {

  isNew = true;
  form: FormGroup;

  constructor(private route: ActivatedRoute,
              private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })

    // this.route.params.subscribe((params: Params) => {
    //   if(params['id']) {
    //     this.isNew = false;
    //     // update existing
    //   } else {
    //     // add new
    //   }
    // })

    this.form.disable()

    this.route.params
      .pipe(switchMap((params: Params) => { //creates new stream
            if(params['id']) {
              this.isNew = false;
              return this.categoriesService.getById(params['id'])
            } else {
              return of(null)
            }
        })
      ).subscribe((category) => {
        if(category){
          this.form.patchValue({
            name: category.name
          })
          MaterialService.updateTextInputs();
        }
        this.form.enable()
      },
      (error) => {
        MaterialService.toast(error)
        this.form.enable()
      })
  }

  onSubmit($event: Event) {}
}
