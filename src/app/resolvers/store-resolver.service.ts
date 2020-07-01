import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '../models/store.model';
import { StoresService } from '../services/stores.service';

@Injectable({ providedIn: 'root' })
export class StoreResolver implements Resolve<Store> {
  constructor(private storesService: StoresService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Store> | Promise<Store> | Store {
    const storeId = route.paramMap.get('id');

    return this.storesService.getStore(storeId);
  }
}
