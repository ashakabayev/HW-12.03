import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/categories.service';
import { Category } from 'src/app/shared/category.types';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  form: FormGroup;
  category: Category;
  categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  @Input() editedCategory: Category;

  ngOnInit(): void {
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
