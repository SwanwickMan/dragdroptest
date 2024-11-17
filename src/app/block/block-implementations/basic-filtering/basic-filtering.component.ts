import { Component } from '@angular/core';
import { BlockComponent } from '../../block.component';
import {NgClass, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-basic-filtering',
  standalone: true,
  imports: [
    NgStyle,
    FormsModule,
    NgClass
  ],
  templateUrl: './basic-filtering.component.html',
  styleUrl: '../../block.component.css'
})
export class BasicFilteringComponent extends BlockComponent{
  height: number = 130;
  width: number = 190;
  color: string = "skyblue";

  minimumGenesPerCell: number = 200;
  minimumCellsPerGene: number = 3;
  genesPerCell: number = this.minimumGenesPerCell;
  cellsPerGene: number = this.minimumCellsPerGene;
}
