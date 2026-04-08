import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ArticleListItemModel} from '../models/articleListItem.model';
import {ArticleDetailModel} from '../models/articleDetail.model';
import {ArticleFormDataModel} from '../models/articleFormData.model';
import {ArticleFormInitDataModel} from '../models/articleFormInitData.model';
import {RegisterFormDataModel} from '../models/registerFormData.model';
import {LoginFormDataModel} from '../models/loginFormData.model';
import {LoginResponseModel} from '../models/loginResponseModel';
import {HomeResponseModel} from '../models/homeResponse.model';
import {CategoryDetailsModel} from '../models/categoryDetails.model';


@Injectable({
  providedIn: 'root',
})
export class DailyBugleService {

  BASE_URL = 'http://localhost:8080/daily-bugle-angular';

  constructor(private httpClient: HttpClient) { }


    getAllArticles(): Observable<ArticleListItemModel[]>{
    return this.httpClient.get<ArticleListItemModel[]>(this.BASE_URL + '/api/articles');
    }

    getArticleById(id: number): Observable<ArticleDetailModel>{
      return this.httpClient.get<ArticleDetailModel>(this.BASE_URL + '/api/articles/' + id);
    }

    createMovie (data: ArticleFormDataModel) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(this.BASE_URL + '/api/articles', data, {headers});
    }

  getFormInitData(): Observable<ArticleFormInitDataModel> {
    return this.httpClient.get<ArticleFormInitDataModel>(
      this.BASE_URL + '/api/articles/form-init-data'
    );
  }

    registerProfile(data: RegisterFormDataModel){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      return this.httpClient.post(this.BASE_URL + '/api/users/register', data, {headers});
    }

  loginProfile(data: LoginFormDataModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(
      this.BASE_URL + '/api/users/login',
      data
    );
  }

  getHomePageData(): Observable<HomeResponseModel> {
    return this.httpClient.get<HomeResponseModel>(this.BASE_URL + '/api/home');
  }


  createComment(articleId: number, content: string) {
    return this.httpClient.post(
      `${this.BASE_URL}/api/articles/${articleId}/comments`,
      { content }
    );
  }

  createRating(articleId: number, value: number) {
    return this.httpClient.post(
      `${this.BASE_URL}/api/articles/${articleId}/ratings`,
      {  value: Number(value) }
    );
  }

  getArticlesByKeyword(keyword: string) {
    return this.httpClient.get<ArticleListItemModel[]>(
      `${this.BASE_URL}/api/articles/by-keyword/${keyword}`
    );
  }

  getArticlesByCategory(category: string) {
    return this.httpClient.get<ArticleListItemModel[]>(
      `${this.BASE_URL}/api/articles/category/${category}`
    );
  }

  getCategories() {
    return this.httpClient.get<CategoryDetailsModel[]>(
      this.BASE_URL + '/api/articles/categories'
    );
  }


}
