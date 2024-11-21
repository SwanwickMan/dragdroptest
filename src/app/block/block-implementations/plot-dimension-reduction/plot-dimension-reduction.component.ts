import { Component } from '@angular/core';
import { BlockComponent } from '../../block.component';
import {NgClass, NgStyle} from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-plot-dimension-reduction',
  standalone: true,
    imports: [
        NgStyle,
        NgClass,
        FormsModule
    ],
  templateUrl: './plot-dimension-reduction.component.html',
  styleUrl: '../../block.component.css'
})
export class PlotDimensionReduction extends BlockComponent{
  height: number = 130;
  width: number = 200;
  color: string = "white";

  colorBy: string = "leiden";
  reduction: string = "PCA";
}
