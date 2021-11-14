import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../app.config';
import { map, catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getAll(uri: string) {
    return this.http.get<any>(AppConfig.settings.WhiteServer + uri).pipe(
      catchError(this.handleError),
      map(data => {
        if (data==null) {
          this.router.navigateByUrl('/error-page');
        }
        return data;
      })
    )
  }

  getParam(uri: string, param?) {
    return this.http.get<any>(AppConfig.settings.WhiteServer + uri + param).pipe(
      catchError(this.handleError),
      map(data => {
        if (data == null) {
          this.router.navigateByUrl('/error-page');
        }
        return data;
      })
    )
  }

  get(uri: string, id) {
    return this.http.get<any>(AppConfig.settings.WhiteServer + uri + "/" + id).pipe(
      catchError(this.handleError),
      map(data => {
        if (data==null) {
          this.router.navigateByUrl('/error-page');
        }
        return data;
      })
    )
  }

  post(uri: string, data) {
    return this.http.post<any>(AppConfig.settings.WhiteServer + uri, data).pipe(
      catchError(this.handleError),
      map(data => {
        if (data==null) {
          this.router.navigateByUrl('/error-page');
        }
        return data;
      })
    )
  }

  postUrl(uri: string, data, url?) {
    let header = new HttpHeaders();
    header.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>(AppConfig.settings.WhiteServer + uri + url, data, { headers: header }).pipe(
      catchError(this.handleError),
      map(data => {
        if (data == null) {
          this.router.navigateByUrl('/error-page');
        }
        return data;
      })
    )
  }

  put(uri: string, data) {
    return this.http.put<any>(AppConfig.settings.WhiteServer + uri, data).pipe(
      catchError(this.handleError),
      map(data => {
        // if (data==null) {
        //   this.router.navigateByUrl('/error-page');
        // }
        return data;
      })
    )
  }


  delete(uri: string, id) {
    return this.http.delete<any>(AppConfig.settings.WhiteServer + uri + "/" + id).pipe(
      catchError(this.handleError),
      map(data => {
        console.log(data)
        // if (data==null) {
        //   this.router.navigateByUrl('/error-page');
        // }
        return data;
      })
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);

      if (error.status === 403 && error.error) {
        return throwError(`${error.error.code}: ${error.error.message}`);
      }
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
