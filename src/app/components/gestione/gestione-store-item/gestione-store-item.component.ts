import { Component, OnInit, Input } from '@angular/core';
import { Store } from 'src/app/models/store.model';
import { config } from 'src/app/config';


@Component({
  selector: 'app-gestione-store-item',
  templateUrl: './gestione-store-item.component.html',
  styleUrls: ['./gestione-store-item.component.scss']
})
export class GestioneStoreItemComponent implements OnInit {

  @Input() store: Store;

  constructor() {}

  ngOnInit(): void {}

  get logo() {
    return `${config.apiUrl}/stores/${this.store._id}/logo`;
  }

}
