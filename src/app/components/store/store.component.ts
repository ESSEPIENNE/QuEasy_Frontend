import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

import { Store } from 'src/app/models/store.model';
import { Code } from 'src/app/models/code.model';
import { CodesService } from 'src/app/services/codes.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit, OnChanges {
  store: Store;
  codes: Code[];

  inStoreCodes: Code[];
  inQueueCodes: Code[];

  public doughnutChartLabels: Label;
  public doughnutChartData: MultiDataSet;
  public doughnutChartType: ChartType;
  public doughnutChartOptions: ChartOptions;
  public doughnutChartColors: Color[];

  constructor(private route: ActivatedRoute, private codesService: CodesService) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => (this.store = data['store']));
    this.route.data.subscribe((data: Data) => {
      this.codes = data['codes'];
      this.inStoreCodes = this.codes.filter((x) => x.status[0] === 'in_store');
      this.inQueueCodes = this.codes.filter((x) => x.status[0] === 'in_queue');
    });

    this.doughnutChartType = 'doughnut';
    this.doughnutChartLabels = ['Occupati', 'Liberi'];
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
  }

  removeCode(codeId: string) {
    
    this.codesService.removeCode(this.store._id, codeId).subscribe((data) => {
      console.log('remove');
      this.codes.splice(this.codes.findIndex(x => x._id === codeId), 1);
    });
  }
}
