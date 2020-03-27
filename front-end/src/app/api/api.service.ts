import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

export interface Data{
  id:number;
  title:string;
  description:string;
  createDate:string;
  updateDate:string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  ApiUrl = 'api/test';
  
  constructor(private http: HttpClient){}

  /* GET: get all data from DB */ 
  getData(): Observable<Data[]>  {
    return this.http.get<Data[]>(this.ApiUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /* POST: add new one to DB */
  addData(data: Data): Observable<Data> {
    return this.http.post<Data>(this.ApiUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /* DELETE: delete one from DB */
  deleteData (id: number): Observable<{}> {
    const url = `${this.ApiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /* PUT: update one from DB */
  updateData (id:number,data: Data): Observable<Data> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
    const url = `${this.ApiUrl}/${id}`;
    return this.http.put<Data>(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // handle error
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
