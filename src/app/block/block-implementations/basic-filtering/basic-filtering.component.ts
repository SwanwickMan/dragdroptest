import { Component } from '@angular/core';
import { BlockComponent } from '../../block.component';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-basic-filtering',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './basic-filtering.component.html',
  styleUrl: '../../block.component.css'
})
export class BasicFilteringComponent extends BlockComponent{
  height: number = 60;
  width: number = 150;
  color: string = "skyblue";
}
