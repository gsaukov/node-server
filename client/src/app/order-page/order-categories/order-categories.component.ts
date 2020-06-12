import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../../shared/services/categories.service";
import {Observable} from "rxjs";
import {Category} from "../../shared/services/interfaces";

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html'
})
export class OrderCategoriesComponent implements OnInit {

  constructor(private categoriesService: CategoriesService) { }

  categories$: Observable<Category[]>

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch()
  }

}
