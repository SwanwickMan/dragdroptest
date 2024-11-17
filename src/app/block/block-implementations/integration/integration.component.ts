import { Component } from '@angular/core';
import { BlockComponent } from '../../block.component';
import {NgClass, NgStyle} from '@angular/common';

@Component({
  selector: 'app-integration',
  standalone: true,
  imports: [
    NgStyle,
    NgClass
  ],
  templateUrl: './integration.component.html',
  styleUrl: '../../block.component.css'
})
export class Integration extends BlockComponent{
  height: number = 55;
  width: number = 200;
  color: string = "brown";
}
