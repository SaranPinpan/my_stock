import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; //Check this
import { Product } from '../models/product.model';

@Injectable({ //service
  providedIn: 'root'
})
export class NetworkService {
  baseAPIURL = environment.baseAPIURL;
  productAPI = `${environment.baseAPIURL}/products`;
  autnAPI = `${environment.baseAPIURL}/auth`;
  
  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productAPI, httpOptions);
  }
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJGb3IgVGVzdGluZyIsImlkIjoiMiIsInVzZXJuYW1lIjoiaWJsdXJibHVyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQ2FzaGllciIsImVtYWlsIjoiaWJsdXJibHVyQGRldi5jb20iLCJleHAiOjE2MDU0MDkwMjUsImlzcyI6IkNvZGVNb2JpbGVzIEx0ZCIsImF1ZCI6Imh0dHA6Ly9jb2RlbW9iaWxlcy5jb20ifQ.47XhkzdGLg17iEzCQnumvldEpUQf5-OxKNhmftiQa4A';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: `Bearer ${token}`
  })
};