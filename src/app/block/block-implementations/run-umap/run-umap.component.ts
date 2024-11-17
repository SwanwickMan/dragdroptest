import { Component } from '@angular/core';
import { BlockComponent } from '../../block.component';
import {NgClass, NgStyle} from '@angular/common';

@Component({
  selector: 'app-run-umap',
  standalone: true,
  imports: [
    NgStyle,
    NgClass
  ],
  templateUrl: './run-umap.component.html',
  styleUrl: '../../block.component.css'
})
export class RunUmap extends BlockComponent{
  height: number = 55;
  width: number = 200;
  color: string = "gray";
}
