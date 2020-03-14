import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/categories.service';
import { Category } from 'src/app/shared/category.types';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoriesService: CategoriesService,
              private route: ActivatedRoute
  ) {}

  categories: Category[];
  oneCategory: Category;
  form: FormGroup;
  editedCategory: Category;
  selectedId: number;


  ngOnInit(): void {
    this.form = new FormGroup({
      byName: new FormControl('', Validators.required)
    });
    this.categoriesService.getAll().subscribe(data => {
      this.categories = data;
    });
  }
  onSubmit() {
    for (const category of this.categories) {
      console.log(  typeof this.form.value.byName);
      if (category.name.toString() === this.form.value.byName) {
        this.oneCategory = category;
      }
    }
    this.form.reset();
  }
  editClicked(category) {
    this.editedCategory = category;
    console.log(this.editedCategory);
  }


}
