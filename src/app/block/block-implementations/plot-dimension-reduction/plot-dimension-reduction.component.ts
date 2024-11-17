import { Component } from '@angular/core';
import { BlockComponent } from '../../block.component';
import {NgClass, NgStyle} from '@angular/common';

@Component({
  selector: 'app-plot-dimension-reduction',
  standalone: true,
  imports: [
    NgStyle,
    NgClass
  ],
  templateUrl: './plot-dimension-reduction.component.html',
  styleUrl: '../../block.component.css'
})
export class PlotDimensionReduction extends BlockComponent{
  height: number = 55;
  width: number = 200;
  color: string = "white";
}
