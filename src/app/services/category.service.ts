import { Injectable } from "@angular/core";
import { SERVER_URL } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryDTO } from '../models/dtos';

@Injectable({
    providedIn: "root"
})
export class CategoryService {

    categoryURL = SERVER_URL + '/category';

    constructor(
        private httpClient: HttpClient
    ) { }

    public getCategories(): Observable<CategoryDTO[]> {
        return this.httpClient.get<CategoryDTO[]>(this.categoryURL);
    }
}