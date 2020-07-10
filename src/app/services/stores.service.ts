import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Store } from '../models/store.model';

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  constructor(private http: HttpClient) {}

  getStores() {
    return this.http.get<Store[]>(`${config.apiUrl}/stores`).pipe(
      // tap((stores) => console.log(stores)),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  getStore(storeId: string) {
    return this.http.get<Store>(`${config.apiUrl}/stores/${storeId}`).pipe(
      // tap((store: Store) => console.log(store)),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  removeStore(storeId: string) {
    return this.http.delete(`${config.apiUrl}/stores/${storeId}`).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  createStore(storeData: FormData) {
    return this.http.post(`${config.apiUrl}/stores`, storeData).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    );
  }
}
