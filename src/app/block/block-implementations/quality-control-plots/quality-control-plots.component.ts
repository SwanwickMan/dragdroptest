import { Component } from '@angular/core';
import { BlockComponent } from '../../block.component';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-basic-filtering',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './quality-control-plots.component.html',
  styleUrl: '../../block.component.css'
})
export class QualityControlPlots extends BlockComponent{
  height: number = 55;
  width: number = 200;
  color: string = "crimson";
}
