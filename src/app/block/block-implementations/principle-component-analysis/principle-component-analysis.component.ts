import { Component } from '@angular/core';
import { BlockComponent } from '../../block.component';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-principle-component-analysis',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './principle-component-analysis.component.html',
  styleUrl: '../../block.component.css'
})
export class PrincipleComponentAnalysis extends BlockComponent{
  height: number = 55;
  width: number = 200;
  color: string = "pink";
}
