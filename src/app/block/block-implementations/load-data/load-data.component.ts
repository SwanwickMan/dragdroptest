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

  public static hasInstance: boolean = false;

  selectedDataSet: string = "1";



  // Do not allow LoadData to insert beneath other blocks
  override insertUnderneath(block: BlockComponent) {
    return;
  }

  // When destroyed allow new instances to be created
  override ngOnDestroy() {
    LoadData.hasInstance = false;
    super.ngOnDestroy();
  }
}
