import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/category.types';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  host = 'http://localhost:8080';
  constructor(
    private httpClient: HttpClient
  ) { }
  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.host}/categories`);
  }
  getById(id: number) {
    return this.httpClient.get<Category>(`${this.host}/categories/${id}`);
  }

  create(category: Category) {
    return this.httpClient.post<Category>(`${this.host}/categories`, category);
  }
  update(category: Category) {
    return this.httpClient.put<any>(`${this.host}/categories/${category.id}`, category);
  }
  deleteCategory(id: number) {
    return this.httpClient.delete<Category>(`${this.host}/categories/${id}`);
  }
}
