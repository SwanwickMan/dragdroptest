import { Component } from '@angular/core';
import { BlockComponent } from '../../block.component';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-integration',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './integration.component.html',
  styleUrl: '../../block.component.css'
})
export class Integration extends BlockComponent{
  height: number = 55;
  width: number = 200;
  color: string = "brown";
}
