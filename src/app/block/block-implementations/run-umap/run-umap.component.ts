import { Component } from '@angular/core';
import { BlockComponent } from '../../block.component';
import {NgClass, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-run-umap',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    FormsModule
  ],
  templateUrl: './run-umap.component.html',
  styleUrl: '../../block.component.css'
})
export class RunUmap extends BlockComponent{
  height: number = 130;
  width: number = 200;
  color: string = "gray";
  noOfNeighbours: number = 10;
  noOfPrincipleComponents: number = 40;
}
