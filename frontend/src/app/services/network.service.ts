import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; //Check this
import { Product } from '../models/product.model';
import { User } from '../models/user.model';

@Injectable({ //service
  providedIn: 'root'
})

export class NetworkService {
  baseAPIURL = environment.baseAPIURL;
  productAPI = `${environment.baseAPIURL}/products`;
  autnAPI = `${environment.baseAPIURL}/auth`;
  userAPI = `${environment.baseAPIURL}/user`;

  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productAPI);
    // return this.httpClient.get<Product[]>(this.productAPI, httpOptions);
  }

  deleteProducts(productId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.productAPI}/${productId}`);
  }

  // e.g. [GET] https://localhost:5001/products/1
  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.productAPI}/${id}`);
  }

  // e.g. [GET] https://localhost:5001/products/images/product_049fkfkfl14.jpg
  getImageNetwork(image): string {
    if (image) {
      return `${this.productAPI}/images/${image}`;
    }
    return 'assets/images/no_photo.jpg';
  }

  // e.g. [POST] https://localhost:5001/products
  // Content-Type: multipart/form-data;
  addProduct(product: Product): Observable<any> {
    return this.httpClient.post(this.productAPI, this.makeFormData(product))
  }

  // e.g. [PUT] https://localhost:5001/products/1
  // Content-Type: multipart/form-data;
  editProduct(product: Product): Observable<any> {
    return this.httpClient.put(`${this.productAPI}/${product.productId}`, this.makeFormData(product))
  }

  makeFormData(product: Product): FormData {
    let formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", `${product.price}`);
    formData.append("stock", `${product.stock}`);
    formData.append("formFile", product.image);
    return formData;
  }

  // e.g. [POST] https://localhost:5001/auth/login
  // Content-Type: application/json;
  login(user: User): Observable<any> {
    return this.httpClient.post(`${this.autnAPI}/login`, user);
  }

  // e.g. [POST] https://localhost:5001/auth/register
  // Content-Type: application/json;
  register(user: User): Observable<any> {
    // return this.httpClient.post(`${this.autnAPI}/register`, user);
    return this.httpClient.post(`${this.autnAPI}/register`, this.userFormData(user));
  }

  userFormData(user: User): FormData {
    let formData = new FormData()
    formData.append("username", user.username)
    formData.append("password", user.password)
    formData.append("position", user.position)
    formData.append("formFile", user.image)
    return formData
  }

  getUserInfo(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.userAPI}/${id}`);
  }

  getUserImage(imgName): string {
    if (imgName) {
      return `${this.productAPI}/images/${imgName}`;
    }
    return 'assets/images/no_photo.jpg';
  }
}

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJGb3IgVGVzdGluZyIsImlkIjoiMiIsInVzZXJuYW1lIjoiaWJsdXJibHVyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQ2FzaGllciIsImVtYWlsIjoiaWJsdXJibHVyQGRldi5jb20iLCJleHAiOjE2MDU0MDkwMjUsImlzcyI6IkNvZGVNb2JpbGVzIEx0ZCIsImF1ZCI6Imh0dHA6Ly9jb2RlbW9iaWxlcy5jb20ifQ.47XhkzdGLg17iEzCQnumvldEpUQf5-OxKNhmftiQa4A';

// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: `Bearer ${token}`
//   })
// };