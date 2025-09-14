import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/Product";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly url: string = `${apiUrl}/product`;

  constructor(private readonly http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }
}
