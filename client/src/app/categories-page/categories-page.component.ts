import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../shared/services/categories.service";
import {Category} from "../shared/services/interfaces";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html'
})
export class CategoriesPageComponent implements OnInit {

  loading = false;
  categories: Category[] = []

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.loading = true
    this.categoriesService.fetch().subscribe(categories => {
      this.categories = categories;
      this.loading = false
    })

  }

}
