import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {MaterialService} from "../../shared/classes/material.service";
import {Category} from "../../shared/services/interfaces";


@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  isNew = true;
  form: FormGroup;
  image: File
  imagePreview
  category: Category
  @ViewChild('fileInput') fileInput: ElementRef


  constructor(private route: ActivatedRoute,
              private categoriesService: CategoriesService,
              private router: Router) { }

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
      ).subscribe((category: Category) => {
        if(category){
          this.category = category
          this.form.patchValue({
            name: category.name
          })
          this.imagePreview =category.imageSrc
          MaterialService.updateTextInputs();
        }
        this.form.enable()
      },
      (error) => {
        MaterialService.toast(error)
        this.form.enable()
      })
  }

  onFileInputClick(event: MouseEvent) {
    this.fileInput.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file)
  }

  onSubmit(event: Event) {
    let obs$: Observable<Category>

    this.form.disabled
    if (this.isNew) {
      obs$ = this.categoriesService.create(this.form.value.name, this.image)
    } else {
      obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image)
    }
    obs$.subscribe(
      category => {
        this.category = category
        MaterialService.toast('Changes saved')
        this.form.enable()
      },
      error => {
        MaterialService.toast(error)
        this.form.enable()
      }
    )
  }

  deleteCategory($event: MouseEvent) {
    const descision = confirm('Are you sure you want to delete category ' + this.category.name)

    if(descision){
      this.categoriesService.delete(this.category._id).subscribe(
        (resp) => {MaterialService.toast(resp.message)},
        (error) => {MaterialService.toast(error.message)},
        () => {this.router.navigate(['/categories'])}
      )
    }
  }
}
