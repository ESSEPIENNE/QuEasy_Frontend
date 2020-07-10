import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

import { Store } from 'src/app/models/store.model';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-gestione',
  templateUrl: './gestione.component.html',
  styleUrls: ['./gestione.component.scss'],
})
export class GestioneComponent implements OnInit {
  stores: Store[];

  constructor(
    private route: ActivatedRoute,
    private storesService: StoresService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => (this.stores = data['stores']));
  }

  onDelete(storeId: string) {
    this.storesService.removeStore(storeId).subscribe((_) => {
      const storeIndex = this.stores.findIndex((x) => x._id === storeId);
      this.stores.splice(storeIndex, 1);
    });
  }
}
