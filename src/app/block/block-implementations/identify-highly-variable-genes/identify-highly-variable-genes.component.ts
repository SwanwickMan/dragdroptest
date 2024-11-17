import { Component } from '@angular/core';
import { BlockComponent } from '../../block.component';
import {NgClass, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'identify-highly-variable-genes',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    FormsModule
  ],
  templateUrl: './identify-highly-variable-genes.component.html',
  styleUrl: '../../block.component.css'
})
export class IdentifyHighlyVariableGenes extends BlockComponent{
  height: number = 160;
  width: number = 250;
  color: string = "green";
  minMean: number = 0.0125;
  maxMean: number = 3;
  minDispersion: number = 0.5;
}
