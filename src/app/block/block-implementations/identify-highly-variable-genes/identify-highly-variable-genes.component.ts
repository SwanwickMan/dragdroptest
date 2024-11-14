import { Component } from '@angular/core';
import { BlockComponent } from '../../block.component';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-basic-filtering',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './identify-highly-variable-genes.component.html',
  styleUrl: '../../block.component.css'
})
export class IdentifyHighlyVariableGenes extends BlockComponent{
  height: number = 55;
  width: number = 250;
  color: string = "green";
}
