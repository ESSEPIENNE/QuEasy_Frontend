import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Code } from '../models/code.model';
import { CodesService } from '../services/codes.service';

@Injectable({ providedIn: 'root' })
export class StoreCodesResolver implements Resolve<Code[]> {
  constructor(private codesService: CodesService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Code[]> | Promise<Code[]> | Code[] {
    const storeId = route.paramMap.get('id');

    return this.codesService.getGetStoreCodes(storeId);
  }
}
