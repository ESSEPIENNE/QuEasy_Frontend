import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Code } from '../models/code.model';

@Injectable({
  providedIn: 'root',
})
export class CodesService {
  constructor(private http: HttpClient) {}

  getStoreCodes(storeId: string) {
    return this.http
      .get<Code[]>(`${config.apiUrl}/stores/${storeId}/codes`)
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  removeCode(storeId:string, codeId: string) {    
    return this.http.delete(`${config.apiUrl}/stores/${storeId}/codes/${codeId}`)
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }
}
