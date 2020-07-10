import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Label, Color, BaseChartDirective } from 'ng2-charts';
import Pusher from 'pusher-js';

import { config } from '../../config';
import { Store } from 'src/app/models/store.model';
import { Code } from 'src/app/models/code.model';
import { CodesService } from 'src/app/services/codes.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit, OnChanges {
  private pusherClient: Pusher;

  store: Store;

  inStoreCodes: Code[];
  inQueueCodes: Code[];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  public doughnutChartLabels: Label;
  public doughnutChartData: MultiDataSet;
  public doughnutChartType: ChartType;
  public doughnutChartOptions: ChartOptions;
  public doughnutChartColors: Color[];

  constructor(
    private route: ActivatedRoute,
    private codesService: CodesService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => (this.store = data['store']));
    this.route.data.subscribe((data: Data) => {
      const codes = data['codes'];
      this.setCodes(codes);
    });

    this.doughnutChartType = 'doughnut';
    this.doughnutChartLabels = ['Occupati', 'Liberi'];
    this.setChartData();

    this.doughnutChartOptions = {
      rotation: 1 * Math.PI,
      circumference: 1 * Math.PI,
    };
    this.doughnutChartColors = [
      {
        backgroundColor: ['#e6840e', '#db165b'],
      },
      {
        backgroundColor: ['#e6840e', '#db165b'],
      },
    ];

    this.pusherClient = new Pusher(config.pusherKey, { cluster: 'eu' });
    const channel = this.pusherClient.subscribe(`store-${this.store._id}`);

    channel.bind('code-status-change', () => {
      this.codesService.getStoreCodes(this.store._id).subscribe((codes) => {
        console.log('updated');

        this.setCodes(codes);
        this.refreshChart();
      });
    });
  }

  setCodes(codes: Code[]) {
    this.inStoreCodes = codes.filter((x) => x.status[0] === 'in_store');
    this.inQueueCodes = codes.filter((x) => x.status[0] === 'in_queue');
  }

  setChartData() {
    this.doughnutChartData = [
      [
        this.inQueueCodes.length,
        this.store.max_queue - this.inQueueCodes.length,
      ],
      [
        this.inStoreCodes.length,
        this.store.max_in_store - this.inStoreCodes.length,
      ],
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
  }

  removeCode(code: Code) {
    this.codesService
      .removeCode(this.store._id, code.code)
      .subscribe((data) => {
        const codeStoreIndex = this.inStoreCodes.findIndex(
          (x) => x._id === code._id
        );
        const codeQueueIndex = this.inQueueCodes.findIndex(
          (x) => x._id === code._id
        );
        if (codeStoreIndex > -1) this.inStoreCodes.splice(codeStoreIndex, 1);
        if (codeQueueIndex > -1) this.inQueueCodes.splice(codeQueueIndex, 1);

        this.refreshChart();
      });
  }

  refreshChart() {
    this.setChartData();
    this.chart.chart.update();
  }
}
