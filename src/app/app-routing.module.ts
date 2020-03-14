import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { CategoryComponent } from 'src/app/category/category.component';
import { CategoriesComponent } from 'src/app/categories/categories.component';
import { EditCategoryComponent } from 'src/app/edit-category/edit-category.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent,
        children: [
          {
            path: 'category',
            component: CategoryComponent
          },
          {
            path: 'category/:id',
            component: CategoryComponent
          },
          {
            path: 'categories',
            component: CategoriesComponent
          }
        ]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
