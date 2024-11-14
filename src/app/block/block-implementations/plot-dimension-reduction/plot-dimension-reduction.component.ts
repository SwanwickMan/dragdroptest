import { Component } from '@angular/core';
import { BlockComponent } from '../../block.component';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-basic-filtering',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './plot-dimension-reduction.component.html',
  styleUrl: '../../block.component.css'
})
export class PlotDimensionReduction extends BlockComponent{
  height: number = 55;
  width: number = 200;
  color: string = "white";
}
