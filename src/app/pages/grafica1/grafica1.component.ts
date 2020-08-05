import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels: string[] = [
    'Pizza', 'Tacos', 'Hamburguesas'
  ];
  public data1: number[][] = [
    [350, 50, 10]
  ];

}
