import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/shared/category.types';
import { CategoriesService } from 'src/app/shared/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  form: FormGroup;
  category: Category;
  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  categories: Category[] = [];
  input: string;
  ngOnInit(): void {
    this.input = '123';
    this.form = new FormGroup({
      name: new FormControl('', Validators.required)
    });
    this.route.paramMap
    .pipe(
      mergeMap(params => {
        if (params.get('id')) {
          this.categoriesService.getById(+params.get('id'));
        }
        return of(null);
      })
    ).subscribe(category => {
      this.category = category;
      if (this.category) {
        this.form.get('name').setValue(this.category.name);
      }
    });
  }
  onSubmit() {
    for (const i in this.form.controls) {
      if (this.form.controls[i]) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }
    if (!this.form.valid) {
      console.log('error');
      return;
    }
    this.categoriesService.create(this.form.value)
    .pipe(catchError((err) => of(null)))
    .subscribe(res => {
      if (res && res.id) {
        this.router.navigate(['home', 'categories']);
      }
    });
  }

}
