import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {
  @Input('title') titulo: string = 'Sin titulo';
  @Input('label') doughnutChartLabels: Label[] = ['label1', 'label2', 'label3'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [1, 1, 1]
  ];

  public color: Color[] = [
    {
      backgroundColor: ['#6857E6', '#009FEE', '#F02059']
    }
  ]

}
