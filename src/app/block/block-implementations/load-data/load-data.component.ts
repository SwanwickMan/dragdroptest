import { Component } from '@angular/core';
import { BlockComponent } from '../../block.component';
import {NgClass, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-load-data',
  standalone: true,
  imports: [
    NgStyle,
    FormsModule,
    NgClass,
  ],
  templateUrl: './load-data.component.html',
  styleUrl: '../../block.component.css'
})
export class LoadData extends BlockComponent{
  height: number = 75;
  width: number = 200;
  color: string = "yellow";

  selectedDataSet: string = "1";
}
