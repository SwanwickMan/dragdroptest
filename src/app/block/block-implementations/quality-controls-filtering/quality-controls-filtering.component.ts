import { Component } from '@angular/core';
import { BlockComponent } from '../../block.component';
import {NgClass, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-quality-controls-filtering',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    FormsModule
  ],
  templateUrl: './quality-controls-filtering.component.html',
  styleUrl: '../../block.component.css'
})
export class QualityControlsFiltering extends BlockComponent{
  height: number = 200;
  width: number = 200;
  color: string = "purple";

  MaxPerMitochondrialGenes: number = 5;
  selectedSample: string = "1";
  genesPerCell: number = 200;
  cellsPerGene: number = 2500;
}
