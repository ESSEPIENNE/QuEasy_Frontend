import { Component, OnInit, Input } from '@angular/core';
import { Store } from 'src/app/models/store.model';
import { config } from 'src/app/config';

@Component({
  selector: 'app-store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.scss'],
})
export class StoreItemComponent implements OnInit {
  @Input() store: Store;

  constructor() {}

  ngOnInit(): void {}

  get logo() {
    return `${config.apiUrl}/stores/${this.store._id}/logo`;
  }
}
